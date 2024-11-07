class Rectangle {
    
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    area() {
        console.log(`The area of Rectangle is ${this.width * this.height}`);
    }

    paint() {
        console.log(`The color of Rectangle is ${this.color}`);
    }

}

const rect = new Rectangle(3, 4, 'White');
rect.area();
rect.paint();