import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable()
export class MetaService {
    constructor(
        private titleService: Title,
        private metaTagService: Meta
    ) { 
        this.setMeta({});
    }

    public setMeta(meta: any) {
        let mergedMeta = Object.assign({
			'title': 'Жиланов ООД - Употребявани компютри, лаптопи и компоненти с гаранция',
			'description': 'Всичко за вашия компютър на най-конкурентни цени!',
			'twitter:card': 'http://www.jilanov.com/assets/logo.jpg',
			'twitter:title': 'Жиланов ООД - Употребявани компютри, лаптопи и компоненти с гаранция',
			'twitter:description': 'Всичко за вашия компютър на най-конкурентни цени!',
			'twitter:image:src': 'http://www.jilanov.com/assets/logo.jpg',
			'og:title': 'Жиланов ООД - Употребявани компютри, лаптопи и компоненти с гаранция',
			'og:description': 'Всичко за вашия компютър на най-конкурентни цени!',
			'og:image': 'http://www.jilanov.com/assets/logo.jpg',
            'og:image:secure_url': 'http://www.jilanov.com/assets/logo.jpg',
            'og:url': location.href
        }, meta);
        console.log('Meta: ', mergedMeta);
        Object.keys(mergedMeta).forEach(element => {
            if(element === 'title') return;
            this.metaTagService.updateTag(
                { name: element, content: meta[element] }
            );
        });
        this.titleService.setTitle(mergedMeta.title);
    }
}
