---
title: 小米/红米路由器开启ssh
tags: [小米, 路由器, ssh]
---

# 小米/红米路由器开启ssh

> 双十一搞了一个BE7000的WiFi7路由器，带4个满血2.5G网口，自带docker支持(需要额外储存介质并单独安装)，为了提升可扩展性，需要开启ssh并进行一些操作

:::warning
免责声明：本文仅供学习交流使用，请谨慎操作，对于因操作失误导致的任何问题，本人概不负责
:::

## 关于OpenWrt
小米路由器预装的是[OpenWrt](https://openwrt.org/)定制版，是一个针对嵌入式设备开发的高扩展度的[GNU/Linux](https://www.linux.org/)发行版
OpenWrt 不是一个单一且不可更改的固件，而是提供了一个完全可写的文件系统及软件包管理。这使您可以不使用供应商提供的应用程序选择和配置，而是通过使用软件包来定制设备以适应任何应用程序。
对于开发人员来说，OpenWrt 是一个构建应用程序的框架，无需在其周围构建完整的固件; 对于普通用户来说，这意味着拥有了完全定制的能力，能以意想不到的方式使用该设备。

## 准备工作
先决条件

- 一台小米/红米路由器，有管理员密码且能访问后台
- Python3.12环境（之所以是这个版本，因为ssh模块兼容性问题）
- Windows/Linux/macOS系统的电脑

### 克隆项目
从[openwrt-xiaomi/xmir-patcher](https://github.com/openwrt-xiaomi/xmir-patcher)克隆需要准备的软件包
```bash
git clone https://github.com/openwrt-xiaomi/xmir-patcher
```

### 创建虚拟环境，激活及依赖安装
```bash
cd xmir-patcher

```
### 创建并激活虚拟环境
::: code-group
```sh [Linux/macOS]
python3 -m venv venv
source venv/bin/activate
```

```sh [Windows]
python -m venv .venv
.\.venv\Scripts\activate
```
:::

### 安装依赖
Windows下安装ssh2-python时可能会报错，因为没有对应的分发，可以使用Linux/虚拟机或自行编译一个Python扩展
```bash
pip install -r requirements.txt
```

### 执行脚本
:::code-group
```sh [Linux/macOS]
source run.sh
```

```sh [Windows]
.\run.bat
```
:::

执行后会在终端显示如下信息，按照数字提示操作即可

```bash
==========================================================

Xiaomi MiR Patcher


 1 - Set IP-address (current value: 192.168.1.1)
 2 - Connect to device (install exploit)
 3 - Read full device info
 4 - Create full backup
 5 - Install EN/RU languages
 6 - Install Breed bootloader
 7 - Install firmware (from directory "firmware")
 8 - {{{ Other functions }}}
 9 - [[ Reboot device ]]
 0 - Exit

Select:
```

先确保1中的IP地址是正确的(默认情况下是192.168.31.1)，若不正确请先选择1修改路由器IP地址

```bash
Select: 1

Enter device IP-address: # 键入路由器的IP地址
```

接下来选择2连接设备，加载出设备信息后，说明网络可达，会提示你输入路由器的管理员密码，第一次操作会加载一会，请耐心等待

```bash
Select: 2

device_name = RA81
rom_version = 1.0.68 release
mac address = 00:00:00:00:00:00
CountryCode = CN
Enter device WEB password: # 此处请键入web管理密码
Enable smartcontroller scene executor ...
Wait smartcontroller activation ...
Unlock dropbear service ...
Unlock SSH server ...
Set password "root" for root user ...
Enabling dropbear service ...
Run SSH server on port 22 ...
Test SSH connection to port 22 ...

#### SSH server are activated! ####
```

看到这个提示说明ssh已经开启了，可以使用ssh连接路由器了，地址就是路由器的IP地址，用户名是`root`，密码也是`root`

不过这个ssh是临时的，如果你有永久固定的需求，可选择8，然后选择7 `Install permanent SSH`

```bash
Select: 8


----------------------------------------------------------

Xiaomi MiR Patcher (extended functions)


 1 - Set default device IP-address
 2 - Change root password
 3 - Read dmesg and syslog
 4 - Create a backup of the specified partition
 5 - Uninstall EN/RU languages
 6 - Set kernel boot address
 7 - Install permanent SSH
 8 - __test__
 9 - [[ Reboot device ]]
 0 - Return to main menu

Choice: 7
```

### 连接ssh

```bash
ssh root@192.168.31.1 # 此处请替换成你的路由器IP地址
```
可以看到ARE U OK字符画，这是[雷军的一个梗](https://www.bilibili.com/video/BV1es411D7sW)，说明连接成功了
```bash
BusyBox v1.25.1 (2023-09-08 06:36:03 UTC) built-in shell (ash)

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


root@XiaoQiang:~#
```
包管理器：OpenWrt使用的是`opkg`，可以使用`opkg update`更新软件包列表，`opkg install <package>`安装软件包，`opkg remove <package>`卸载软件包

我们先进行一个源的换，使用我们自建的源(重庆邮电大学红岩网校工作站)
```bash
sed -i 's_https\?://downloads.openwrt.org_https://mirrors.cqupt.edu.cn/openwrt_' /etc/opkg/distfeeds.conf
```
后续就可以进行一些扩展啦

## 相关内容
- [OpenWrt 官网](https://openwrt.org/)
- [openwrt-xioaomi Github Organization](https://github.com/openwrt-xiaomi)
- [京东自营 小米（MI) 路由器BE7000 WiFi7](https://item.jd.com/100058107885.html)
- [Are you OK - 雷军](https://www.bilibili.com/video/BV1es411D7sW)