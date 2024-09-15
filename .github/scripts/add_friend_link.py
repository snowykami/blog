"""
Module docs
"""
import os
import json
os.system("pip install PyGithub")
from github import Github

import os



def run():
    # 使用 GitHub token 初始化 Github 对象
    g = Github(os.getenv('GH_TOKEN'))

    # 获取仓库和最新的 issue
    repo = g.get_repo(os.getenv('GITHUB_REPOSITORY'))
#     issue = repo.get_issues(state='open')[0]
    # 通过GITHUB_ISSUE_NUMBER获取issue
    # 通过环境变量获取 issue 编号
    issue_number = int(os.getenv('ISSUE_NUMBER'))


    # 使用 issue 编号获取 issue
    issue = repo.get_issue(number=issue_number)


    # 获取关闭 issue 的用户
    closer = issue.closed_by

    # 检查关闭 issue 的用户是否是仓库的所有者
    if closer.login != repo.owner.login:
        # 如果不是仓库的所有者关闭的 issue，返回一个非零的退出码
        sys.exit(1)

    # 获取 issue 的内容
    issue_body = issue.body

    # 解析 issue 的内容，获取友链信息
    friend_link = parse_issue_body(issue_body)

    # 读取友链 JSON 文件
    with open('.vitepress/data/friend-links.json', 'r') as f:
        friend_link_data = json.load(f)
    # 将新的友链信息添加到友链数据中
    friend_link_data.append(friend_link)
    # 将更新后的友链数据写回到 JSON 文件中
    with open('.vitepress/data/friend-links.json', 'w') as f:
        json.dump(friend_link_data, f, indent=4, ensure_ascii=False)

    # 添加翻译文件
    with open('.vitepress/sugarat/theme/data/i18n/friend-links-i18n.json', 'r') as f:
        friend_i18n_data = json.load(f)
    friend_i18n_data['zh'][f'partnerLink.{friend_link_data[name]}.nickname'] = friend_link_data[name]
    friend_i18n_data['zh'][f'partnerLink.{friend_link_data[name]}.des'] = friend_link_data[des]
    friend_i18n_data['en'][f'partnerLink.{friend_link_data[name]}.nickname'] = friend_link_data[name]
    friend_i18n_data['en'][f'partnerLink.{friend_link_data[name]}.des'] = friend_link_data[des]
    with open('.vitepress/sugarat/theme/data/i18n/friend-links-i18n.json', 'w') as f:
        json.dump(friend_i18n_data, f, indent=4, ensure_ascii=False)

def parse_issue_body(issue_body):
    # 在这里解析 issue 的内容，获取友链信息
    # 这将取决于你的 issue 的格式
    pass

if __name__ == "__main__":
    run()