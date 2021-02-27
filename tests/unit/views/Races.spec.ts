import { flushPromises, mount } from '@vue/test-utils';
import Races from '@/views/Races.vue';
import Race from '@/components/Race.vue';

describe('Races.vue', () => {
  test('should display every race name in a title', async () => {
    const wrapper = mount(Races);
    await flushPromises();

    // You need to have a field `races` initialized with 2 races
    const racesField = wrapper.vm.races;
    expect(racesField).not.toBeUndefined();
    // You need to have a field `races` initialized with 2 races
    expect(racesField).toHaveLength(2);
    expect(racesField[0].name).toBe('Paris');
    expect(racesField[1].name).toBe('Tokyo');

    const raceComponents = wrapper.findAllComponents(Race);
    // You should have a `Race` component per race in your template
    expect(raceComponents).toHaveLength(2);
  });
});
