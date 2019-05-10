import React from 'react';

import './Home.less';
import FaceLeftPic from '../../assets/imgs/NDk2MDg0NjE1.jpeg';

export default class Home extends React.Component {
  render() {
    return (
      <main className="my-home">
        <section className="my-face">
          <div className="face-left">
            <img
              src={FaceLeftPic}
              alt="人类首张黑洞照片"
              title="4月10日21点，人类首张黑洞照片公布"
            />
          </div>
          <div className="face-center">
            <h1>你好，</h1>
            <h2>我是王启，</h2>
            <h3>一个对未知充满好奇的人。</h3>
          </div>
          <div className="face-right">
            <img
              src={FaceLeftPic}
              alt="4月10日21点，人类首张黑洞照片"
              title="4月10日21点，人类首张黑洞照片公布"
            />
          </div>
        </section>
      </main>
    );
  }
}
