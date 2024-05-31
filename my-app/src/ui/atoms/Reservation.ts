export class Reservation {
    id: string;
    mileage: string;
    productId: string;
    reservationTime: Date;
    secondOption: string;
    userId: string;

    constructor(id: string, mileage: string, productId: string, reservationTime: Date, secondOption: string, userId: string) {
        this.id = id;
        this.mileage = mileage;
        this.productId = productId;
        this.reservationTime = reservationTime;
        this.secondOption = secondOption;
        this.userId = userId;
    }
}