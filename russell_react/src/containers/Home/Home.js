import React from 'react';

import './Home.less';
import FaceLeftPic from '../../assets/imgs/NDk2MDg0NjE1.jpeg';
import RussellPic from '../../assets/imgs/Bertrand_Russell.jpg';

export default class Home extends React.Component {
  render() {
    return (
      <main className="my-home">
        <section className="my-face">
          <div className="face-content">
            <div className="face-left">
              <img
                className="face-img"
                src={FaceLeftPic}
                alt="人类首张黑洞照片"
                title="4月10日21点，人类首张黑洞照片公布"
              />
            </div>
            <div className="face-center">
              <h1>你好，</h1>
              <h1>我是王启，</h1>
              <h1>一个好奇星人。</h1>
              <h2>喜欢思考热爱知识，有一颗不安分的心！</h2>
            </div>
            <div className="face-right">
              <img
                className="face-img"
                src={RussellPic}
                alt="伯特兰.罗素油画"
                title="Bertrand Russell: Part of the children have the habit of thinking, and the purpose of education is to root out this kind of habit."
              />
            </div>
          </div>
        </section>
      </main>
    );
  }
}
