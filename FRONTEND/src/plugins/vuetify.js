import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            dark: {
                primary: '#127475',
                secondary: '#ABFF4F',
                error: '#F2542D',
                info: '#0E9594',
                success: '#29BF12',
                warning: '#FF9914',
                col1: '#e3d5ca',
                col2: '#E0AFA0',
                col3: '#F4F3EE',
                col4: '#BCB8B1',
                col5: '#e9ecef',
                col6: '#463F3A'
            },
            light: {
                primary: '#127475',
                secondary: '#ABFF4F',
                error: '#F2542D',
                info: '#0E9594',
                success: '#29BF12',
                warning: '#FF9914',
                col1: '#e3d5ca',
                col2: '#E0AFA0',
                col3: '#F4F3EE',
                col4: '#BCB8B1',
                col5: '#fbfefb',
                col6: '#463F3A'
            },
        },
    },
});
