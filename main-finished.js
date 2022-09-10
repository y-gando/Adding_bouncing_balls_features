// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
   return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


// EvilCircle の定義
// 親
class Shape {
   constructor(x, y, velX, velY,) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
   }
}

class Ball extends Shape {
   constructor(x, y, velX, velY, color, size) {
      // superは親のコンストラクタを継承してくる
      super(x, y, velX, velY);
      // superは以下の4行と同義
      // this.x = x;
      // this.y = y;
      // this.velX = velX;
      // this.velY = velY;
      this.color = color;
      this.size = size;
      // Ballコンストラクターはexistsという新しいプロパティを定義する必要がある。
      this.exists = true;
   }

   draw() {
      if (this.exists === true) {
         // 元気です！
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
         ctx.fillStyle = this.color;
         ctx.fill();
      } else if(this.exists !== true) {
         // 死んじゃった！とき
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0,2 * Math.PI);
         ctx.strokeStyle = this.color;
         ctx.stroke();
      }
   }

   collisionDetect() {
      for (const ball of balls) {
         if (!(this === ball) && ball.exists) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
               ball.color = this.color = randomRGB();
            }
         }
      }
   }

   update() {
      if ((this.x + this.size) >= width) {
         this.velX = -(this.velX);
      }

      if ((this.x - this.size) <= 0) {
         this.velX = -(this.velX);
      }

      if ((this.y + this.size) >= height) {
         this.velY = -(this.velY);
      }

      if ((this.y - this.size) <= 0) {
         this.velY = -(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
   }
}

// 親から継承
// Shapeを拡張してEvilCircleクラスにする
class EvilCircle extends Shape {
   SIZE = 10;

   /**
    * コンストラクター
    * @param {number} x - EvilCircle の x座標の値
    * @param {number} y - EvilCircle の y座標の値
    */
   constructor(x, y) {
      super(x, y, 20, 20);
      this.color = 'white';
      this.size = this.SIZE;
   }

   draw() {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.lineWidth = 3;
   }

   checkBounds() {
      if ((this.x + this.size) >= width) {
         // this.velX = -(this.velX);
      }

      if ((this.x - this.size) <= 0) {
         // this.velX = -(this.velX);
      }

      if ((this.y + this.size) >= height) {
         // this.velY = -(this.velY);
      }

      if ((this.y - this.size) <= 0) {
         // this.velY = -(this.velY);
      }
   }


   // 衝突判定
   // 衝突した時に食べる処理が行われる
   collisionDetect() {
      for (const ball of balls) {
         // 0.元気と悪の判定方法
         if (ball.exists === true) {
            // ここにくる ball のは元気なボールやつだけ
            // 元気なボールを stroke にしたい！

            // 1.悪と元気がぶつかっているかどうかの判定をする
            //thisはevilCircleのこと
            // 悪と元気の距離を求める
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // その距離が悪の半径と元気の半径の大きさより小さい場合ぶつかっている
            if (distance < this.size + ball.size) {
               // 悪と元気なボールがぶつかっているとき
               // 元気なボールを stroke にする！
               // ctx.beginPath();
               // ctx.strokeStyle = ball.color;
               // ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
               // ctx.stroke();
               ball.exists = false;
            }
         }
         
         // 全てのボールがくる
      }
   }

}


//　オブジェクトを作る
// const aaa = 2;
// EvilCircleのインタンスを作る
// EvilCircle コンストラクター


window.addEventListener('keydown', (e) => {
   switch (e.key) {
      case 'a':
         badBall.x -= badBall.velX;
         break;
      case 'd':
         badBall.x += badBall.velX;
         break;
      case 'w':
         badBall.y -= badBall.velY;
         break;
      case 's':
         badBall.y += badBall.velY;
         break;
   }
});


const balls = [];

while (balls.length < 25) {
   const size = random(10, 20);
   const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomRGB(),
      size
   );

   balls.push(ball);
}

const badBall = new EvilCircle(
   random(0 + 10, width - 10),
   random(0 + 10, height - 10)
);

function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0, width, height);
   badBall.draw();

   for (const ball of balls) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
   }

   // badBall.checkBounds();
   badBall.collisionDetect();

   requestAnimationFrame(loop);
}

loop();

// まず、（必要な引数を指定して）新しい邪悪な円オブジェクトインスタンスを作成