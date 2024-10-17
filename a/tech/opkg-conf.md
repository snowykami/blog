---
title: OPKG包管理器配置及问题解决
description: OPKG 工具 (一个 ipkg 变种) 是一个用来从本地软件仓库或互联网软件仓库上下载并安装 OpenWrt 软件包的轻量型软件包管理器。
tags: [Linux, OpenWrt, OPKG, 包管理器]
---

# OPKG包管理器配置及问题解决

> 该文章适用于aarch64架构CPU的搭载OpenWrt系统的小米路由器，理论上其他设备也能抄作业

## 关于OPKG包管理器
OPKG 工具 (一个 ipkg 变种) 是一个用来从本地软件仓库或互联网软件仓库上下载并安装 OpenWrt 软件包的轻量型软件包管理器。

GNU/Linux 用户可能会对 apt-get，aptitude，pacman，yum 等比较熟悉，也会看出其相似之处。它与 NSLU2 上同样用于嵌入式设备的 Optware 也有相似之处。OPKG 没有仅仅将软件安装到一个单独的路径（如：/opt），而是根文件系统上的一个完整的包管理器。它也包含了增加内核模块与驱动的可能性。OPKG 有时被称为 Entware ，但这主要是针对为嵌入式设备准备的 Entware 仓库。

## 配置opkg
当我在配置好的OpenWrt系统上直接使用opkg尝试安装包时，发现它原源已经无法访问了，于是我需要更换源。
大部分不同的嵌入式设备的CPU架构之间大概率是不兼容的，在配置源的时候需要注意这一点。

查看当前设备的CPU架构：
```bash
root@XiaoQiang:~# uname -m
aarch64 # 这里是CPU架构
```

查看发行版信息：
:::code-group
```bash[openwrt-release]
root@XiaoQiang:~# cat /etc/openwrt_release 
DISTRIB_ID='OpenWrt'
DISTRIB_RELEASE='18.06-SNAPSHOT'
DISTRIB_REVISION='unknown'
DISTRIB_TARGET='ipq95xx/generic'
DISTRIB_ARCH='aarch64_cortex-a73_neon-vfpv4'
DISTRIB_DESCRIPTION='OpenWrt 18.06-SNAPSHOT unknown'
DISTRIB_TAINTS='no-all busybox override'
```

```bash[os-release]
root@XiaoQiang:~# cat /etc/os-release
NAME="OpenWrt"
VERSION="18.06-SNAPSHOT"
ID="openwrt"
ID_LIKE="lede openwrt"
PRETTY_NAME="OpenWrt 18.06-SNAPSHOT"
VERSION_ID="18.06-snapshot"
HOME_URL="http://openwrt.org/"
BUG_URL="http://bugs.openwrt.org/"
SUPPORT_URL="http://forum.lede-project.org/"
BUILD_ID="unknown"
LEDE_BOARD="ipq95xx/generic"
LEDE_ARCH="aarch64_cortex-a73_neon-vfpv4"
LEDE_TAINTS="no-all busybox override"
LEDE_DEVICE_MANUFACTURER="OpenWrt"
LEDE_DEVICE_MANUFACTURER_URL="http://openwrt.org/"
LEDE_DEVICE_PRODUCT="Generic"
LEDE_DEVICE_REVISION="v0"
LEDE_RELEASE="OpenWrt 18.06-SNAPSHOT unknown"
```
:::info
18.06-snapshot似乎是小米家路由器的默认发行版，我查看了好几个小米家路由器的发行版信息，都是这个版本。
:::

### 更换源
找了一大圈没有找到`aarch64_cortex-a73`的，暂时用`aarch64-generic`的源代替。
(如果有对应CPU内核的源，可以使用对应的源，这里只是举例)

备份`cp /etc/opkg/distfeeds.conf /etc/opkg/distfeeds.conf.bak`

并编辑`/etc/opkg/distfeeds.conf`文件，用以下内容替换原有内容：
```bash
src/gz base https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/base
src/gz packages https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/packages
src/gz luci https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/luci
src/gz routing https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/routing
src/gz telephony https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/telephony
```

### 尝试更新及配置wget
不出所料，按照正常包管理器的操作，应该更新源，但是出现了新问题。所用的wget不支持该https url。

```bash
root@XiaoQiang:~# opkg update
Downloading https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/base/Packages.gz
wget: not an http or ftp url: https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/base/Packages.gz
*** Failed to download the package list from https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/base/Packages.gz

Downloading https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/packages/Packages.gz
wget: not an http or ftp url: https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/packages/Packages.gz
*** Failed to download the package list from https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/packages/Packages.gz

Downloading https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/luci/Packages.gz
wget: not an http or ftp url: https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/luci/Packages.gz
*** Failed to download the package list from https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/luci/Packages.gz

Downloading https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/routing/Packages.gz
wget: not an http or ftp url: https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/routing/Packages.gz
*** Failed to download the package list from https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/routing/Packages.gz

Downloading https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/telephony/Packages.gz
wget: not an http or ftp url: https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/telephony/Packages.gz
*** Failed to download the package list from https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/telephony/Packages.gz

Collected errors:
 * opkg_download: Failed to download https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/base/Packages.gz, wget returned 1.
 * opkg_download: Failed to download https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/packages/Packages.gz, wget returned 1.
 * opkg_download: Failed to download https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/luci/Packages.gz, wget returned 1.
 * opkg_download: Failed to download https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/routing/Packages.gz, wget returned 1.
 * opkg_download: Failed to download https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/telephony/Packages.gz, wget returned 1.
```

于是我又不得不手动从源下载wget支持ssl的版本的ipk包，然后从本地安装。

文件：[wget-ssl_1.21.2-1_aarch64_generic.ipk](https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/packages/wget-ssl_1.21.2-1_aarch64_generic.ipk)

由于路由器不支持scp/sftp等，我们可以通过一些其他方法，例如可移动储存介质，局域网内起一个http服务然后用wget等，或者用一些骚操作来挂载网络磁盘共享文件

我这里用的U盘，插上后自动挂载到了/mnt/usb-633fe923/，然后就可以直接安装了。

但是安装时又出现了问题，原因是我下载的wget-ssl包不兼容当前CPU架构。
```bash
root@XiaoQiang:~# opkg install /mnt/usb-633fe923/wget-ssl_1.21.2-1_aarch64_generic.ipk 
Unknown package 'wget-ssl'.
Collected errors:
 * pkg_hash_fetch_best_installation_candidate: Packages for wget-ssl found, but incompatible with the architectures configured
 * opkg_install_cmd: Cannot install package wget-ssl.
```
看了下[OPKG包管理器的文档](https://openwrt.org/zh/docs/techref/opkg)，大概明白了是怎么回事：opkg配置文件中的`arch`字段与下载的包的`arch`字段不匹配。

wget-ssl包中control文件中的`Architecture`字段是`aarch64_generic`，而我在配置文件中并没有找到架构信息

```bash
root@XiaoQiang:~# cat /etc/opkg.conf 
dest root /
dest ram /tmp
lists_dir ext /var/opkg-lists
option overlay_root /overlay
option check_signature
```

我们在可以确保下载的包是对应CPU架构的情况下，可以修改`/etc/opkg.conf`文件，将`arch aarch64_generic`追加进去。

:::tip
在使用opkg安装包时，若提示架构不匹配，在确保软件包支持的情况下，可以尝试修改`/etc/opkg.conf`文件，添加`arch`字段。
:::

```bash
root@XiaoQiang:~# echo "arch all 100\narch aarch64_generic 200" >> /etc/opkg.conf
```

再次安装wget-ssl包，又出现了以下新问题，空间不足。这种情况只能安装到外部存储设备上或者/data分区了。
```bash
root@XiaoQiang:~# opkg install /mnt/usb-633fe923/wget-ssl_1.21.2-1_aarch64_generic.ipk
Installing wget-ssl (1.21.2-1) to root...
Collected errors:
 * verify_pkg_installable: Only have 0kb available on filesystem /overlay, pkg wget-ssl needs 214
 * opkg_install_cmd: Cannot install package wget-ssl.
```

编辑`/etc/opkg.conf`文件，将`dest`字段改为data分区或者外部存储设备上的目录。(这里我选择了data分区)

```bash
root@XiaoQiang:~# vim /etc/opkg.conf
```

```bash
- dest root /
+ dest data /data
  dest ram /tmp
  lists_dir ext /var/opkg-lists

  arch all 100
  arch aarch64_generic 200
```

再次安装wget-ssl包，成功。
```bash
root@XiaoQiang:~# opkg install /mnt/usb-633fe923/wget-ssl_1.21.2-1_aarch64_generic.ipk --force-depends
Installing wget-ssl (1.21.2-1) to data...
Configuring wget-ssl.
Collected errors:
 * satisfy_dependencies_for: Cannot satisfy the following dependencies for wget-ssl:
 *      libc
 *      libpcre
 *      zlib
 *      libopenssl1.1
 *      librt
root@XiaoQiang:/data/usr/bin# opkg install /mnt/usb-633fe923/wget-ssl_1.21.2-1_aarch64_generic.ipk --force-depends
Package wget-ssl (1.21.2-1) installed in data is up to date.
```

尝试使用`wget-ssl`命令，找不到，因为我们没有把`/data/usr/bin`加入到环境变量中。

编辑`/etc/profile`文件，将`/data/usr/bin`加入到环境变量中。
```bash
root@XiaoQiang:~# vim /etc/profile
```

```bash
export LD_LIBRARY_PATH="/data/usr/lib:/data/lib"  # 添加这一行
export PATH="/usr/sbin:/usr/bin:/sbin:/bin:/data/usr/bin:/data/usr/sbin:/data/usr/libexec" # 追加俩目录
```

使配置生效
```bash
root@XiaoQiang:~# source /etc/profile
 -----------------------------------------------------
       Welcome to XiaoQiang!
 -----------------------------------------------------
  $$$$$$\  $$$$$$$\  $$$$$$$$\      $$\      $$\        $$$$$$\  $$\   $$\
 $$  __$$\ $$  __$$\ $$  _____|     $$ |     $$ |      $$  __$$\ $$ | $$  |
 $$ /  $$ |$$ |  $$ |$$ |           $$ |     $$ |      $$ /  $$ |$$ |$$  /
 $$$$$$$$ |$$$$$$$  |$$$$$\         $$ |     $$ |      $$ |  $$ |$$$$$  /
 $$  __$$ |$$  __$$< $$  __|        $$ |     $$ |      $$ |  $$ |$$  $$<
 $$ |  $$ |$$ |  $$ |$$ |           $$ |     $$ |      $$ |  $$ |$$ |\$$\
 $$ |  $$ |$$ |  $$ |$$$$$$$$\       $$$$$$$$$  |       $$$$$$  |$$ | \$$\
 \__|  \__|\__|  \__|\________|      \_________/        \______/ \__|  \__|


```

此时再次使用`wget-ssl`命令，成功。

若要让opkg能够使用该命令，正常情况下可以使用软连接，但是小米路由器的`/usr/bin`目录是只读的，所以我们可以用新的命令覆盖旧的命令。
```bash
root@XiaoQiang:~# mv /data/usr/libexec/wget-ssl /data/usr/libexec/wget
```

重新编辑`/etc/profile`文件，修改几个PATH的顺序，把我们新的wget-ssl所在的目录放在前面。
```bash
export PATH="/data/usr/bin:/data/usr/libexec:/usr/sbin:/usr/bin:/sbin:/bin"
```

使配置生效
```bash
root@XiaoQiang:~# source /etc/profile
 -----------------------------------------------------
       Welcome to XiaoQiang!
 -----------------------------------------------------
  $$$$$$\  $$$$$$$\  $$$$$$$$\      $$\      $$\        $$$$$$\  $$\   $$\
 $$  __$$\ $$  __$$\ $$  _____|     $$ |     $$ |      $$  __$$\ $$ | $$  |
 $$ /  $$ |$$ |  $$ |$$ |           $$ |     $$ |      $$ /  $$ |$$ |$$  /
 $$$$$$$$ |$$$$$$$  |$$$$$\         $$ |     $$ |      $$ |  $$ |$$$$$  /
 $$  __$$ |$$  __$$< $$  __|        $$ |     $$ |      $$ |  $$ |$$  $$<
 $$ |  $$ |$$ |  $$ |$$ |           $$ |     $$ |      $$ |  $$ |$$ |\$$\
 $$ |  $$ |$$ |  $$ |$$$$$$$$\       $$$$$$$$$  |       $$$$$$  |$$ | \$$\
 \__|  \__|\__|  \__|\________|      \_________/        \______/ \__|  \__|


```

此时使用wget命令，发现已经是新的wget-ssl了。(若未生效请重登ssh)
```bash
root@XiaoQiang:~# wget
wget: missing URL
Usage: wget [OPTION]... [URL]...

Try `wget --help' for more options.
```

### 更新源及完成安装
再次尝试更新源，成功!
```bash
root@XiaoQiang:~# opkg update
Downloading https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/base/Packages.gz
Updated list of available packages in /var/opkg-lists/base
Downloading https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/packages/Packages.gz
Updated list of available packages in /var/opkg-lists/packages
Downloading https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/luci/Packages.gz
Updated list of available packages in /var/opkg-lists/luci
Downloading https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/routing/Packages.gz
Updated list of available packages in /var/opkg-lists/routing
Downloading https://downloads.immortalwrt.org/releases/18.06-SNAPSHOT/packages/aarch64_generic/telephony/Packages.gz
Updated list of available packages in /var/opkg-lists/telephony
```

## 后日谈

可以临时指定目录来安装包(需在`/etc/opkg.conf`中配置)，例如：
```bash
opkg install --dest usb python3
```
也是成功装上Python3.10了