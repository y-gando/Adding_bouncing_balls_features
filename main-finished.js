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
      this.exiists = true;
   }

   draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

   collisionDetect() {
      for (const ball of balls) {
         if (!(this === ball) && ball.exiists) {
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
   constructor(x, y) {
      super(x, y, 20, 20, 'white', 10);
   }

   draw() {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.arclineWidth(en - US) = 3;
   }

   collisionDetect() {
      for (const ball of balls) {
         // if () {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
               ball.color = this.color = randomRGB();
            }
         // }
      }
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
}


//　オブジェクトを作る
// const aaa = 2;
// EvilCircleのインタンスを作る
// EvilCircle コンストラクター


window.addEventListener('keydown', (e) => {
   switch (e.key) {
      case 'a':
         this.x -= this.velX;
         break;
      case 'd':
         this.x += this.velX;
         break;
      case 'w':
         this.y -= this.velY;
         break;
      case 's':
         this.y += this.velY;
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

function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0, width, height);

   for (const ball of balls) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
   }

   requestAnimationFrame(loop);
}

loop();
