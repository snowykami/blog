"""
Module docs
"""
import os
os.system("pip install PyGithub")

import json
from github.GitTree import GitTree
from github import Github, InputGitTreeElement

COMMAND_HEAD = "Friend Link Request"
FRIEND_LINKS_JSON = ".vitepress/data/friend-links.json"
FRIEND_LINKS_I18N_JSON = ".vitepress/sugarat/theme/data/i18n/friend-links-i18n.json"

g = Github(os.getenv('TOKEN'))
repo = g.get_repo(os.getenv('REPOSITORY'))
issue_number = int(os.getenv('ISSUE_NUMBER'))
act_type = os.getenv('ACT_TYPE')  # opened, edited, closed, deleted   对应事件类型
"""
opened: 添加友链
edited: 修改友链
closed: 审核通过
deleted: 删除友链
"""
issue = repo.get_issue(number=issue_number)
issue_title = issue.title
issue_body = json.loads(issue.body)
friend_link_name = issue_body["name"]
friend_link_name_en = issue_body.get("name_en", "")
friend_link_des = issue_body["des"]
friend_link_des_en = issue_body.get("des_en", "")
friend_link_url = issue_body["url"]
friend_link_icon = issue_body["icon"]
creator_lang = issue_body.get("lang", "zh")
creator_name = issue.user.login
ref = repo.get_git_ref("heads/main")

i18n_text = {
        "zh": {
                "pre_check_finished"    : "✅ 预检查完成，等待仓库所有者审核",
                "pre_check_failed"      : "❌ 预检查未通过：{COMMENT}，请修改issue",
                "failed_not_a_https_url": "❌ URL不是HTTPS链接",
                "check_passed"          : "✅ 审核通过，已添加友链，页面稍后就会构建好",
                "if_add_i18n_data"      : "🌐 是否添加国际化数据？如需添加请修改issue添加`name_en`、`des_en`字段。",
                "about_edit"            : "📑 如需修改信息，请直接编辑issue，不要新建issue。"
        },
        "en": {
                "pre_check_finished"    : "✅ Pre-check finished, waiting for repository owner to review",
                "pre_check_failed"      : "❌ Pre-check failed: {COMMENT}，please modify the issue",
                "failed_not_a_https_url": "❌ URL is not a HTTPS link",
                "check_passed"          : "✅ Check passed, the friend link has been added, and the page will be built soon.",
                "if_add_i18n_data"      : "🌐 Do you want to add internationalization data? If you want, please modify the issue to add `name_en` and `des_en` "
                                          "fields.",
                "about_edit"            : "📑 If you need to modify the information, please edit the issue directly instead of creating a new issue."
        }
}
if creator_lang not in i18n_text:
    lang = "zh"


def get_text(key: str) -> str:
    return i18n_text[creator_lang].get(key, key)


# closed触发
def run_add():
    """审核通过 关闭时触发"""
    closer = issue.closed_by
    if closer.login != repo.owner.login and not issue.title.startswith(COMMAND_HEAD):
        issue.create_comment(get_text("about_edit"))
    # 修改友链信息
    with open(FRIEND_LINKS_JSON, 'r') as f:
        friend_link_data = json.load(f)
        friend_link_data.append(
            {
                    "nickname": f'partnerLink.{creator_name}.nickname',
                    "des"     : f'partnerLink.{creator_name}.des',
                    "avatar"  : friend_link_icon,
                    "url"     : friend_link_url,
            }
        )
    with open(FRIEND_LINKS_JSON, 'w') as f:
        json.dump(friend_link_data, f, indent=4, ensure_ascii=False)

    # 修改友链国际化信息
    with open(FRIEND_LINKS_I18N_JSON, 'r') as f:
        friend_i18n_data = json.load(f)
    friend_i18n_data['zh'][f'partnerLink.{creator_name}.nickname'] = friend_link_name
    friend_i18n_data['zh'][f'partnerLink.{creator_name}.des'] = friend_link_des
    friend_i18n_data['en'][f'partnerLink.{creator_name}.nickname'] = friend_link_name_en or f"{creator_name}'s site"
    friend_i18n_data['en'][f'partnerLink.{creator_name}.des'] = friend_link_des_en or f"{creator_name}'s site"
    with open(FRIEND_LINKS_I18N_JSON, 'w') as f:
        json.dump(friend_i18n_data, f, indent=4, ensure_ascii=False)

    tree = repo.create_git_tree(
        base_tree=repo.get_git_tree("main"),
        tree=[
            InputGitTreeElement(
                path=FRIEND_LINKS_JSON,
                mode="100644",
                type="blob",
                content=f":busts_in_silhouette: Add friend link: {friend_link_url}({creator_name})",
            ),
            InputGitTreeElement(
                path=FRIEND_LINKS_I18N_JSON,
                mode="100644",
                type="blob",
                content=f":busts_in_silhouette: Add friend link i18n data: {friend_link_url}({creator_name})",
            )
        ]
    )
    # 提交修改
    repo.create_git_commit(
        message=f":busts_in_silhouette: Add friend link: {friend_link_url}({creator_name})",
        tree=tree,
        parents=[repo.get_git_commit(ref.object.sha)]
    )

    # 完成提交
    issue.create_comment(get_text("check_passed"))


# opened触发
def run_pre_check():
    import re
    os.system("pip install requests")
    # 检查链接是否合法
    if not re.match(r"^https?://", friend_link_url) and not re.match(r"^https?://", friend_link_icon):
        issue.create_comment(get_text("pre_check_failed").format(COMMENT=get_text("failed_not_a_https_url")))
        return
    else:
        issue.create_comment(get_text("pre_check_finished"))


if __name__ == "__main__":
    if issue_title.startswith(COMMAND_HEAD):
        if act_type in ["opened", "edited"]:
            run_pre_check()
        elif act_type == "closed":
            run_add()
        else:
            raise ValueError(f"Unsupported act_type: {act_type}")

    else:
        print("Not a friend link request issue, passed.")
