import { mount, RouterLinkStub } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';

function navbarWrapper() {
  return mount(Navbar, {
    global: {
      components: {
        RouterLink: RouterLinkStub
      }
    }
  });
}

describe('Navbar.vue', () => {
  test('should have a `navbarCollapsed` field', () => {
    const navbar = navbarWrapper().vm;
    // Check that `navbarCollapsed` is initialized with `true`.
    // Maybe you forgot to declare `navbarCollapsed` in your component.
    expect(navbar.navbarCollapsed).toBe(true);
  });

  test('should have a `toggleNavbar` function', () => {
    const navbar = navbarWrapper().vm;
    // Maybe you forgot to declare a `toggleNavbar()` function.
    expect(navbar.toggleNavbar).not.toBeNull();
    navbar.toggleNavbar();

    // `toggleNavbar()` should change `navbarCollapsed` from true to false`
    expect(navbar.navbarCollapsed).toBe(false);

    navbar.toggleNavbar();

    // `toggleNavbar()` should change `navbarCollapsed` from false to true`
    expect(navbar.navbarCollapsed).toBe(true);
  });

  test('should toggle the class on click', async () => {
    const wrapper = navbarWrapper();
    const navbarCollapsed = wrapper.get('#navbar').element;
    // The element with the id `#navbar` should have the class `collapse`
    expect(navbarCollapsed.className).toContain('navbar-collapse collapse');

    // We should have a `button` element to collapse the menu
    const button = wrapper.get('button');
    await button.trigger('click');

    const navbar = wrapper.get('#navbar').element;
    // The element with the id `#navbar` should have not the class `collapse` after a click
    expect(navbar.className).toContain('navbar-collapse');
    expect(navbar.className).not.toContain('navbar-collapse collapse');
  });

  test('should display a link to the home page', () => {
    const wrapper = navbarWrapper();
    // The navbar brand should link to the home page
    const navbarBrand = wrapper.getComponent(RouterLinkStub);
    expect(navbarBrand.text()).toBe('PonyRacer');
    // The URL of the link is not correct.
    // Maybe you forgot to use `<RouterLink to="/">` or `<RouterLink :to="{ name: 'home' }">`?
    if (navbarBrand.props().to?.name) {
      expect(navbarBrand.props().to.name).toBe('home');
    } else {
      expect(navbarBrand.props().to).toBe('/');
    }
  });

  test('should display a link to the races page', () => {
    const wrapper = navbarWrapper();
    const links = wrapper.findAllComponents(RouterLinkStub);
    // You should have two links in the navbar: one to home and one to the races
    expect(links).toHaveLength(2);
    const racesLink = links[1];
    // The races link should link to the races page
    expect(racesLink.exists()).toBeTruthy();
    expect(racesLink.text()).toBe('Races');
    // The URL of the link is not correct.
    // Maybe you forgot to use `<RouterLink to="/races">` or `<RouterLink :to="{ name: 'races' }">`?
    expect(racesLink.props().to?.name || racesLink.props().to).toContain('races');
  });
});
