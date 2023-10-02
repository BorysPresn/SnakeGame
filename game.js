class Game {
    constructor(size, grid) {
        this.size = size;
        this.grid = grid;
        this.snake = new Snake();
        this.food = { x: 10, y: 10 }; // начальная позиция еды
        this.dx = 0;
        this.dy = 1;
        this.score = 0;
        this.interval = 500;
    }

    generateFood() {
        // ... логика для генерации новой позиции еды
        let newFood = {};
        do {
            newFood = {
                x: Math.floor(Math.random() * this.size),
                y: Math.floor(Math.random() * this.size)
            };
        } while (this.checkCollisson(newFood, this.snake.body));

        //remove eated food from game field
        document.querySelector(`[data-row="${this.food.x}"][data-col="${this.food.y}"]`).classList.remove('food');

        this.food.x = newFood.x;
        this.food.y = newFood.y;
    }

    checkCollisson(object, objToCheck){
        return objToCheck.some(elem => elem.x === object.x && elem.y === object.y)
    }

    update() {
        // ... обновление состояния игры
        this.snake.move(this.dx, this.dy);
        const snakeHead = this.snake.body[0];
        //food is eated
        if(snakeHead.x === this.food.x && snakeHead.y === this.food.y) {
            console.log('food is eated');
            this.snake.grow(this.dx, this.dy);
            this.generateFood()
            this.score += 10;
            this.interval -= 10;
            this.start();
            document.querySelector('.score').innerHTML =`SCORE: ${this.score}`;
        }
        //out of field
        // console.log(this.size, snakeHead.x, snakeHead.y)
        if (snakeHead.x < 0 || snakeHead.x >= this.size || snakeHead.y < 0 || snakeHead.y >= this.size) {
            clearInterval(this.gameInterval);
        }
    }

    draw() {
        // ... отрисовка игры на экране
        document.querySelectorAll('.snake').forEach(cell => {
            cell.classList.remove('snake');
        })

        document.querySelector(`[data-row="${this.food.x}"][data-col="${this.food.y}"]`).classList.add('food');
        
        this.snake.body.forEach(element => {
            const cell = document.querySelector(`[data-row="${element.x}"][data-col="${element.y}"]`);
            if(cell){ cell.classList.add('snake'); }
        });
    }

    start() {
        clearInterval(this.gameInterval);
        this.gameInterval = setInterval(() => {
            this.update();
            this.draw();
        }, this.interval);
    }
    pause(){
        clearInterval(this.gameInterval);
    }
}