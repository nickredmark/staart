const React = require('react');
const {create} = require('react-test-renderer');
const Login = require('./login').default;
const {provideOothNext} = require('../../test/utils');

const LoginWithOoth = provideOothNext(Login)

describe('<Login />', () => {
    test('renders', async () => {
        const component = create(
            <LoginWithOoth/>
        )
        expect(component.toJSON()).toMatchSnapshot();
    })
});
