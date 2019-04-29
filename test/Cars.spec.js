import { createLocalVue, mount } from '@vue/test-utils';
import Cars from '@/components/Cars.vue';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue()

localVue.use(BootstrapVue);

describe('Cars', () => {
    const wrapper = mount(Cars, {
        localVue,
        propsData: {
            cars: []
        }
    })

    test('is a Vue instance', () => {    
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    test('has method formatLincesePlate', () => {
        expect(typeof wrapper.vm.formatLincesePlate).toBe('function')
    })

    test('method formatLincesePlate return formated licensePlate', () => {
        expect(wrapper.vm.formatLincesePlate('PCG7573')).toBe('PCG-7573')
    })

    test('has props cars', () => {
        expect(typeof wrapper.props().cars).toBe('object')
    })
})
