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
                "failed_not_a_https_url": "URL不是HTTPS链接",
                "check_passed"          : "✅ 审核通过，已添加友链，页面稍后就会构建好",
                "if_add_i18n_data"      : "🌐 是否添加国际化数据？如需添加请修改issue添加`name_en`、`des_en`字段。",
                "about_edit"            : "📑 如需修改信息，请直接编辑issue，不要新建issue。",
                "link_already_exists"   : "该友链已存在或存在同名友链",
                "delete_success"        : "✅ 友链已删除",
                "site_title"            : "标题",
                "site_description"      : "描述",
                "site_ping"             : "延迟",
                "site_url"              : "链接",
        },
        "en": {
                "pre_check_finished"    : "✅ Pre-check finished, waiting for repository owner to review",
                "pre_check_failed"      : "❌ Pre-check failed: {COMMENT}，please modify the issue",
                "failed_not_a_https_url": "URL is not a HTTPS link",
                "check_passed"          : "✅ Check passed, the friend link has been added, and the page will be built soon.",
                "if_add_i18n_data"      : "🌐 Do you want to add internationalization data? If you want, please modify the issue to add `name_en` and `des_en` "
                                          "fields.",
                "about_edit"            : "📑 If you need to modify the information, please edit the issue directly instead of creating a new issue.",
                "link_already_exists"   : "The friend link already exists",
                "delete_success"        : "✅ The friend link has been deleted",
                "site_title"            : "Title",
                "site_description"      : "Description",
                "site_ping"             : "Ping",
                "site_url"              : "URL",
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

    # 修改友链国际化信息
    with open(FRIEND_LINKS_I18N_JSON, 'r') as f:
        friend_i18n_data = json.load(f)
    friend_i18n_data['zh'][f'partnerLink.{friend_link_name}.nickname'] = friend_link_name
    friend_i18n_data['zh'][f'partnerLink.{friend_link_name}.des'] = friend_link_des
    friend_i18n_data['en'][f'partnerLink.{friend_link_name}.nickname'] = friend_link_name_en or f"{creator_name}'s site"
    friend_i18n_data['en'][f'partnerLink.{friend_link_name}.des'] = friend_link_des_en or f"{creator_name}'s site"

    tree = repo.create_git_tree(
        base_tree=repo.get_git_tree("main"),
        tree=[
                InputGitTreeElement(
                    path=FRIEND_LINKS_JSON,
                    mode="100644",
                    type="blob",
                    content=json.dumps(friend_link_data, indent=4, ensure_ascii=False)
                ),
                InputGitTreeElement(
                    path=FRIEND_LINKS_I18N_JSON,
                    mode="100644",
                    type="blob",
                    content=json.dumps(friend_i18n_data, indent=4, ensure_ascii=False)
                )
        ]
    )
    # 提交修改
    commit = repo.create_git_commit(
        message=f":busts_in_silhouette: Add friend link: {friend_link_url}({creator_name})",
        tree=tree,
        parents=[repo.get_git_commit(ref.object.sha)]
    )
    ref.edit(commit.sha)
    issue.create_comment(get_text("check_passed"))


# opened触发
def run_pre_check(typ: str):
    import re
    os.system("pip install requests beautifulsoup4")
    import requests
    from bs4 import BeautifulSoup

    def get_site_metadata(url) -> tuple[str, str, int]:
        response = requests.get(url)
        response.raise_for_status()  # Ensure we notice bad responses
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'html.parser')

        title = soup.title.string if soup.title else "No title found"
        description = "No description found"

        # Look for meta description tag
        description_tag = soup.find('meta', attrs={
                'name': 'description'
        })
        if description_tag and 'content' in description_tag.attrs:
            description = description_tag['content']
        return title, description, int(response.elapsed.microseconds / 1000)

    # 检查链接是否合法
    if not re.match(r"^https?://", friend_link_url) and not re.match(r"^https?://", friend_link_icon):
        issue.create_comment(get_text("pre_check_failed").format(COMMENT=get_text("failed_not_a_https_url")))
        return
    else:
        # 若是opened则检查是否存在友链
        if typ == "opened":
            for friend in json.load(open(FRIEND_LINKS_JSON)):
                if friend["url"] == friend_link_url or friend["name"] == friend_link_name:
                    issue.create_comment(get_text("pre_check_failed").format(COMMENT=get_text("link_already_exists")))
                    return
        print("checking site metadata...")

        title, description, ping_ms = get_site_metadata(friend_link_url)
        site_meta = f"""\n\n**{get_text("site_url")}**: [{friend_link_url}]({friend_link_url})\n\n
**{get_text("site_title")}**: {title}\n\n
**{get_text("site_description")}**: {description}\n\n
**{get_text("site_ping")}**: {ping_ms:.2f}ms\n\n"""
        issue.create_comment(get_text("pre_check_finished") + site_meta + get_text("if_add_i18n_data"))


def run_delete():
    """删除友链"""
    with open(FRIEND_LINKS_JSON, 'r') as f:
        friend_link_data = json.load(f)
        for i, friend in enumerate(friend_link_data):
            if friend["url"] == friend_link_url:
                friend_link_data.pop(i)
                break
    with open(FRIEND_LINKS_I18N_JSON, 'r') as f:
        friend_i18n_data = json.load(f)
        for language in friend_i18n_data:
            for key in list(friend_i18n_data[language]):
                if key.startswith(f'partnerLink.{creator_name}.'):
                    friend_i18n_data[language].pop(key)
    tree = repo.create_git_tree(
        base_tree=repo.get_git_tree("main"),
        tree=[
                InputGitTreeElement(
                    path=FRIEND_LINKS_JSON,
                    mode="100644",
                    type="blob",
                    content=json.dumps(friend_link_data, indent=4, ensure_ascii=False)
                ),
                InputGitTreeElement(
                    path=FRIEND_LINKS_I18N_JSON,
                    mode="100644",
                    type="blob",
                    content=json.dumps(friend_i18n_data, indent=4, ensure_ascii=False)
                )
        ]
    )
    # 提交修改
    commit = repo.create_git_commit(
        message=f":busts_in_silhouette: Delete friend link: {friend_link_url}({creator_name})",
        tree=tree,
        parents=[repo.get_git_commit(ref.object.sha)]
    )
    ref.edit(commit.sha)
    print("✅ 友链已删除")


if __name__ == "__main__":
    if issue_title.startswith(COMMAND_HEAD):
        if act_type in ["opened", "edited"]:
            run_pre_check(act_type)
        elif act_type == "closed":
            run_add()
        elif act_type == "deleted":
            run_delete()
        else:
            raise ValueError(f"Unsupported act_type: {act_type}")

    else:
        print("Not a friend link request issue, passed.")
