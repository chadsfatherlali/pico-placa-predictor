interface CarData {
    licensePlateNumber: string,
    time: number,
    dayOfWeek: number,
    allowedHours:any
}

class Car {
    carData:any;
    maxSequence:number = 10;
    carsList:any = {
        allowed: [],
        notAllowed: []
    };
    days:any = {
        0: [],
        1: [1, 2],
        2: [3, 4],
        3: [5, 6],
        4: [7, 8],
        5: [9, 0],
        6: []
    };
    types:any = {
        A: {
            text: 'Vehículos comerciales'
        },
        U: {
            text: 'Vehículos comerciales'
        },
        Z: {
            text: 'Vehículos comerciales'
        },
        E: {
            text: 'Vehículos gubernamentales'
        },
        X: {
            text: 'Vehículos de uso oficial'
        },
        M: {
            text: 'Vehículos de los Gobiernos Autónomos Descentralizados'
        },
        default: {
            text: 'Vehículo particular'
        }
    };

    constructor (carData: CarData) {
        this.carData = carData;
    }
 
    getList () {
        for (let i = 0; i < this.maxSequence; i++) {
            const allowedDayOfWeek:boolean = this.days[this.carData.dayOfWeek].indexOf(i) === -1 ? true : false;
            const allowedHours:boolean = (this.carData.time >= this.carData.allowedHours.min && this.carData.time <= this.carData.allowedHours.max) 
                || this.carData.time <= this.carData.allowedHours.start
                || this.carData.time >= this.carData.allowedHours.end;
            
            let secondLetter:string = this.carData.licensePlateNumber.charAt(1).toUpperCase();
            let type:any = typeof this.types[secondLetter] === 'undefined' ? this.types.default : this.types[secondLetter];  

            if (allowedDayOfWeek || allowedHours) {
                this.carsList.allowed.push({
                    licensePlateNumber: `${this.carData.licensePlateNumber}${i}`,
                    type: type
                })
            }

            else {
                this.carsList.notAllowed.push({
                    licensePlateNumber: `${this.carData.licensePlateNumber}${i}`,
                    type: type  
                })
            }   
        }

        return this.carsList;
    }
}

export default Car