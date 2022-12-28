import {createStore} from './createStore';

const initialState = {
	count: 0
};

const reducer = (state = initialState, action) => {
	if (action.type === 'ADD') {
		return {...state, count: state.count + 1};
	}
	return state;
};

describe("createStore", () => {
	let store = null;
	let handler;
	beforeEach(() => {
		store = createStore(reducer, initialState);
		handler = jest.fn();
	});
	afterEach(() => {
		store = null;
		handler = null;
	});
	test('return store object', () => {
		expect(store).toBeDefined();
		expect(store.dispatch).toBeDefined();
		expect(store.subscribe).toBeDefined();
		expect(store.getState).not.toBeUndefined();
	});
	test('return object as a state', () => {
		expect(store.getState()).toBeInstanceOf(Object);
	});
	test('return default state', () => {
		expect(store.getState()).toEqual(initialState);
	});
	test('return change state if action exists', () => {
		store.dispatch({type: 'ADD'});
		expect(store.getState().count).toBe(1);
	});
	test('return change state if action not exists', () => {
		store.dispatch({type: 'NOT_ADD'});
		expect(store.getState().count).toBe(0);
	});
	test('call subscriber', () => {
		store.subscribe(handler);
		store.dispatch({type: 'ADD'});
		expect(handler).toHaveBeenCalled();
		expect(handler).toHaveBeenCalledWith(store.getState());
	});
	test('dont call subscriber', () => {
		const unsub = store.subscribe(handler);
		unsub.unsubscribe();
		store.dispatch({type: 'ADD'});
		expect(handler).not.toHaveBeenCalled();
	});
	test('return dispatch async', () => {
		return new Promise(resolve => {
			setTimeout(() => {
				store.dispatch({type: 'ADD'});
			}, 500);
			setTimeout(() => {
				expect(store.getState().count).toBe(1);
				resolve();
			}, 1000);
		});
	});
});
