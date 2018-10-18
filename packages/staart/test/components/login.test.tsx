const React = require('react');
const {create} = require('react-test-renderer');
const Login = require('./login').default;
const {provideOothNext} = require('../../test/utils');
const {compose, withContext} = require('recompose')
const  PropTypes = require('prop-types')

const provideI18n = withContext({__: PropTypes.func}, () => ({__: key => key}))

const LoginWithOoth = compose(
    provideOothNext,
    provideI18n,
)(Login)

describe('<Login />', () => {
    test('renders', async () => {
        const component = create(
            <LoginWithOoth/>
        )
        expect(component.toJSON()).toMatchSnapshot();
    })
});
