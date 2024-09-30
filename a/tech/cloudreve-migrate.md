---
title: Cloudreve 本地文件迁移
tags: [Cloudreve, 迁移, 技术, NAS, 网盘]
---

# Cloudreve 本地文件迁移

> 在同学那低价收购了一块 4T 的HDD，于是我决定将我的 Cloudreve 部分储存桶的文件迁移到这块硬盘上，以便节省服务器系统盘空间。
> 因为时间有限，我也懒得去找相关迁移文档，直接用简单暴力的方法迁移了。

## 0.准备工作

- 停止正在运行的 Cloudreve 服务，具体怎么停止取决于你怎么部署的

## 1. 文件移动

- 已经挂载好的硬盘，我这里挂载在了 `/mnt/data1` 下
- Cloudreve 的文件存储路径，我这里是 `/opt/cloudreve/uploads`
- 使用 `mv` 命令将文件移动到硬盘上

```bash
mv /opt/cloudreve/uploads/* /mnt/data1/cloudreve/  # 此处根据实际情况修改
```

## 2. 索引修改

进入程序目录，找到`cloudreve.db`文件，使用你喜欢的工具打开数据库查看，发现表`files`中有一个`source_name`
字段，这个字段存储了文件的路径，我们需要将这个字段的值修改为新的路径。

根据迁移的位置进行修改，我们需要在原有字段上加上`/mnt/data1/cloudreve/`，这样 Cloudreve 才能找到文件。

执行 SQL 语句：

```sql
UPDATE files SET source_name = '/mnt/data1/cloudreve/' || source_name;
```

保存退出，重启 Cloudreve 服务，即可完成迁移。

也许官方有更好的迁移方法，但是对于我这种只要没出事就不看文档的人来说，这种方法也是可以的。