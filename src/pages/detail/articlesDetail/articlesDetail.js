/*
articles文章详情页
*/
import './articlesDetail.css'

const ArticlesDetail = () => {
    const Nav = () => {
        return (
            <div className="nav">
                <img src={require('../../home/static/logo.png').default} alt='' />
                <p className='title'>恐怖解谜《Light》2022年发售 扮演黑猫帮助女孩逃脱</p>
                <p>2021-11-09 20:51:50</p>
            </div>
        )
    }

    const Main = () => {
        return (
            <div className="main w">
                <p>恐怖解谜《Light》2022年发售 扮演黑猫帮助女孩逃脱</p>
                <br />
                <p>《Light》是一款由Daylight Studio工作室制作的3D恐怖冒险解迷游戏，该作的画面场景偏黑暗，支持中文，玩家将化身为黑猫帮助小女孩逃出生天，《Light》游戏的Steam页面已经上线，将于2022年正式发售，敬请期待。</p>
                <br />
                <img src="http://img4.yxdimg.com/2021/11/9/KDYwMHgp/eb960022-89a4-48f6-b765-28ab9d66a5b1.jpg" />
                <p>  在《LIGHT》的冒险中，你将扮演一只神秘的黑猫，带领失去记忆的小女孩进行一场刺激的冒险。置身于这个黑暗诡谲的幻想中，面对无所不在的黑暗怪物，小心探索这个世界吧。

                    身为一只猫，你做的事情有限，所以必须要尽力引导小女孩解开通往出口的谜题。

                    仔细观察四周，小心不要让小女孩做出错误的决定。

                    游戏画面</p>
                <br />
                <img src="http://img4.yxdimg.com/2021/11/9/KDYwMHgp/5a112c08-bb8a-4736-bbed-c9e2311a3961.jpg" />
                <br />
                <img src="http://img4.yxdimg.com/2021/11/9/KDYwMHgp/69983127-8c81-41e6-a921-1c185f5f7ffe.jpg" />
                <br />
                <img src="http://img4.yxdimg.com/2021/11/9/KDYwMHgp/ee99b65a-53cc-4074-ac14-8274f2c30380.jpg" />
                <br />
                <img src="http://img4.yxdimg.com/2021/11/9/KDYwMHgp/952083e2-d629-4f43-9172-395f55c3c88c.jpg" />
                <br />
                <img src="http://img4.yxdimg.com/2021/11/9/KDYwMHgp/b9b349ac-631a-41b5-b440-6b04629568ea.jpg" />
                <br />
                <img src="http://img4.yxdimg.com/2021/11/9/KDYwMHgp/1d361069-5c93-492d-be1c-d1fd65171a82.jpg" />
                <br />
                <img src="http://img4.yxdimg.com/2021/11/9/KDYwMHgp/52e48a4b-4dfb-48f0-bac7-2f82be46ddfe.jpg" />
                <br />
                <img src="http://img4.yxdimg.com/2021/11/9/KDYwMHgp/2347d353-fdd1-4c59-ab12-e8a03a1b91dd.jpg" />
                <br />
            </div>
        )
    }

    return (
        <div className="articlesDetail w">
            <Nav />
            <Main />
        </div>
    )
}

export default ArticlesDetail