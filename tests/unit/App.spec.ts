/* eslint-disable vue/one-component-per-file */
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils';
import { defineComponent } from 'vue';
import App from '@/App.vue';
import Navbar from '@/components/Navbar.vue';
import Alert from '@/components/Alert.vue';
import { createRouter, createWebHistory } from 'vue-router';

const Hello = defineComponent({
  async setup() {
    return {};
  },
  template: 'Hello'
});
const Error = defineComponent({
  async setup() {
    await Promise.reject();
  },
  template: 'Error'
});
const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Hello },
    { path: '/error', component: Error }
  ]
});

function appWrapper(stubs = {}) {
  return mount(App, {
    global: {
      components: {
        Alert
      },
      plugins: [mockRouter],
      stubs
    }
  });
}

describe('App.vue', () => {
  test('renders the navbar', () => {
    const wrapper = appWrapper({
      RouterView: true,
      RouterLink: true
    });
    const navbar = wrapper.findComponent(Navbar);
    // Maybe you forgot to add <Navbar/> in your App.vue component
    expect(navbar.exists()).toBeTruthy();
  });

  test('renders the router view inside a Suspense component', async () => {
    const wrapper = appWrapper({
      RouterLink: RouterLinkStub
    });
    await mockRouter.push('/');
    expect(wrapper.html()).toContain('Loading...');

    await flushPromises();

    expect(wrapper.html()).not.toContain('Loading...');
    expect(wrapper.html()).toContain('Hello');
  });

  test('renders an error if router view does not load', async () => {
    const wrapper = appWrapper({
      Alert: defineComponent({
        // eslint-disable-next-line vue/require-prop-types
        props: ['variant', 'dismissible'],
        template: 'Alert displayed'
      }),
      RouterLink: RouterLinkStub
    });
    await mockRouter.push('/error');
    expect(wrapper.html()).toContain('Loading...');

    await flushPromises();

    expect(wrapper.html()).not.toContain('Loading...');
    expect(wrapper.html()).toContain('Alert displayed');
  });
});
