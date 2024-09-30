---
title: 分区创建文件系统时遇到的问题 is apparently in use by the system  似乎正被系统使用；将不会在此建立文件系统
---
# 分区创建文件系统时遇到的问题 is apparently in use by the system  似乎正被系统使用；将不会在此建立文件系统

> 从学院一个学长那里收了一块 4T 的硬盘，打算用来存储一些数据，但是在创建文件系统时遇到了问题。

## 先格式化，创建标签

> 这里不用`fdisk`，我们选择`parted`，因为`fdisk`最大只能创建2T的分区，而我们的硬盘是4T的。

```shell
$ sudo parted /dev/sda  # 选择硬盘并启用 parted
(parted) mklabel gpt  # 创建 GPT 标签
(parted) mkpart primary 0% 100%  # 创建一个占满整个硬盘的分区 sda1
(parted) quit  # 退出 parted
```

## 清除 RAID 信息

不出意外的话，我们应该可以使用`mkfs`命令来创建文件系统了。

```shell
$ sudo mkfs.ext4 /dev/sda1
```

但是遇到了以下问题：

```shell
$ sudo mkfs.ext4 /dev/sda1
mke2fs 1.45.5 (07-Jan-2020)
/dev/sda1 is apparently in use by the system; will not make a filesystem here!  # English
/dev/sda1 似乎正被系统使用；将不会在此建立文件系统！  # Chinese
```

上网查阅了相关资料，有说法是设备/dev/sda被DM管理，需要手动解除，但实际上DM并没有占用这个设备。

```shell
$ sudo dmsetup status
No devices found
```

尝试查看设备挂载情况，发现并没有挂载。

```shell
$ sudo mount | grep sda

```

```shell
$ sudo umount /dev/sda1
umount: /dev/sda1: not mounted.
```

暂时没有找到解决办法，只好先放一放。找到了我们团队运维部门的老登问了一下，他叫我使用`wipefs`命令看一下硬盘的信息，并指出了可能的问题。

```shell
$ sudo wipefs /dev/sda
DEVICE OFFSET TYPE              UUID                                  LABEL
sda    0x.... linux_raid_member 00000000-0000-0000-0000-000000000000
sda    ...
...
```

问题就出在这里，硬盘包含了一个`linux_raid_member`类型的分区，表明这个盘之前是用来做 RAID 的，所以我们需要先清除这个分区。

先查看一下设备们

```shell
$ ls /dev | grep md
md127
```

可以看到有一个`md127`设备，这个设备就是之前的 RAID 设备，我们需要先停止这个设备。(以下命令请自行修改`md127`为实际设备名)

```shell
$ sudo mdadm --stop /dev/md127
mdadm: stopped /dev/md127
```

然后移除raid成员

```shell
$ sudo mdadm --remove /dev/md127 /dev/sda1  # 此处为你的设备名和分区名
mdadm: removed /dev/md127
```

清除超级块

```shell
sudo mdadm --misc --zero-superblock /dev/sda1
```
::: tip
**注意：该步操作完成后请再重复一次操作1使用`parted`创建分区，然后再使用`mkfs`创建文件系统。**
:::

## 创建文件系统

使用`mkfs`命令创建文件系统

```shell
$ sudo mkfs.ext4 /dev/sda1
```

现在使用`lsblk`查看一下设备信息，可以看到我们的硬盘已经有了一个分区，但是还没有挂载。

```
$ sudo lsblk -f
NAME   FSTYPE LABEL UUID                                 MOUNTPOINT
...
sda
└─sda1 ext4         00000000-0000-0000-0000-000000000000
```

创建挂载点目录，假设我们要挂载到`/mnt/data`下。

```shell
$ sudo mkdir /mnt/data
```

备份并修改`/etc/fstab`文件，添加我们的新分区，保证开机可以自动挂载。

```shell
$ sudo cp /etc/fstab /etc/fstab.bak && sudo nano /etc/fstab
```

在文件末尾添加以下内容：

```
# WD 4TB /dev/sda1
/dev/disk/by-uuid/49d846b8-186e-4062-b1b0-53b59590f195 /mnt/data1 ext4 defaults 0 1
# 之所以使用uuid而不是设备名是因为设备名在每次重启后可能会变化，尤其是多个sd设备的情况下
```

使用`mount`命令检查并挂载(这一步很重要，如果fstab配置错误，可能会导致无法启动)

```shell
$ sudo mount -a
```

若没有提示错误，则说明配置正确。此时可以使用`df -h`查看挂载情况。
可以看到我们的硬盘已经挂载到了`/mnt/data1`下。

```shell
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
...
/dev/sda1       3.6T   73M  3.4T   1% /mnt/data1
```

完事！感谢运维老登的关键提示