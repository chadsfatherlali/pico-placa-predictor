import Car from '~/class/Car';

describe('Car', () => {
    const carsList = new Car({
        allowedHours: {
            min: 1556029860, 
            max: 1556053140, 
            start: 1556020800, 
            end: 1556065800
        },
        dayOfWeek: 2,
        licensePlateNumber: "pcg757",
        time: 1556060400
    });

    test('carsList is a instance of Car', () => {    
        expect(carsList).toBeInstanceOf(Car)
    })

    test('carsList has method getList', () => {    
        expect(typeof carsList.getList).toBe('function')
    })

    const carsListAllowedAndNotAllowed = carsList.getList(); 

    test('carsList.getList return object with properties "allowed" and "notAllowed"', () => {
        expect(carsListAllowedAndNotAllowed).toHaveProperty('allowed')
        expect(carsListAllowedAndNotAllowed).toHaveProperty('notAllowed')
    })
})