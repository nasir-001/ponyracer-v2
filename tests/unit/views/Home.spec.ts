import { mount, RouterLinkStub } from '@vue/test-utils';
import Home from '@/views/Home.vue';

function homeWrapper() {
  return mount(Home, {
    global: {
      components: {
        RouterLink: RouterLinkStub
      }
    }
  });
}

describe('Home.vue', () => {
  test('should display every race name in a title', () => {
    const wrapper = homeWrapper();

    // You should have an `h1` element to display the title
    const title = wrapper.get('h1');
    expect(title.text()).toContain('Ponyracer');
    // You should have the `small` element inside the `h1` element
    expect(title.text()).toContain('Always a pleasure to bet on ponies');

    // You should have a `small` element to display the subtitle
    const subtitle = wrapper.get('small');
    expect(subtitle.text()).toBe('Always a pleasure to bet on ponies');
  });

  test('display a link to go the login', () => {
    const wrapper = homeWrapper();

    // You should have an `a` element to display the link to the login page
    const link = wrapper.getComponent(RouterLinkStub);
    // The link should have a text
    expect(link.text()).toBe('Login');
    // The URL of the link is not correct.
    // Maybe you forgot to use `<RouterLink to="/login">` or `<RouterLink :to="{ name: 'login' }">`?
    expect(link.props().to?.name || link.props().to).toContain('login');
  });

  test('display a link to go the register page', () => {
    const wrapper = homeWrapper();

    const link = wrapper.findAllComponents(RouterLinkStub)[1];
    // You should have an `a` element to display the link to the register page
    expect(link.exists()).toBeTruthy();
    // The link should have a text
    expect(link.text()).toBe('Register');
    // The URL of the link is not correct.
    // Maybe you forgot to use `<RouterLink to="/register">` or `<RouterLink :to="{ name: 'register' }">`?
    expect(link.props().to?.name || link.props().to).toContain('register');
  });
});
