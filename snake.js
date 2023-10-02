class Snake {
    constructor() {
        this.body = [
            { x: 5, y: 1 },
            { x: 5, y: 0 }
        ]; // начальная позиция змеи
    }

    move(dx, dy) {
        const newHead = { x: this.body[0].x + dx, 
                          y: this.body[0].y + dy
                        };
        this.body.unshift(newHead);
        this.body.pop();
    }

    grow(dx, dy) {
        const newSegment = { x: this.body[this.body.length - 1].x + dx, 
                             y: this.body[this.body.length - 1].y + dy 
                           };
        this.body.push(newSegment);
    }
}
