import { cache } from "../../src/cache";

describe('object cache', () => {

    it('falsy when getting an object that does not exist', () => {
        expect(cache.get('someObject')).toBeFalsy();
    })

    it('sets and gets an object', () => {
        const testObject = {
            myTest: 'test'
        };

        expect(cache.set('test', testObject)).toBeTruthy();

        expect(cache.get('test')).toBe(testObject);
    })
    
});