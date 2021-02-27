import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Races from '@/views/Races.vue';

describe('Races.vue', () => {
  test('should display every race name in a title', async () => {
    const wrapper = mount(Races);
    await nextTick();

    // You need to have a field `races` initialized with 2 races
    const racesField = wrapper.vm.races;
    expect(racesField).not.toBeUndefined();
    // You need to have a field `races` initialized with 2 races
    expect(racesField).toHaveLength(2);
    expect(racesField[0].name).toBe('Lyon');
    expect(racesField[1].name).toBe('London');

    const raceNames = wrapper.findAll('h2');
    // You should have an `h2` element per race in your template
    expect(raceNames).toHaveLength(2);
    expect(raceNames[0].text()).toContain('Lyon');
    expect(raceNames[1].text()).toContain('London');
  });
});
