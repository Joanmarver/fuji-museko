export const menuCategories = [
  { key: 'nigiris', label: 'Nigiris' },
  { key: 'rolls',   label: 'Rolls'   },
  { key: 'especiales', label: 'Especiales' },
];

export const menuItems = {
  nigiris: [
    { name: 'Salmón Premium',  desc: 'Salmón noruego, sal de yuzu, eneldo fresco',        price: '3,20 €', badge: null        },
    { name: 'Atún Akami',      desc: 'Atún rojo, jengibre encurtido, sésamo',              price: '3,80 €', badge: 'Especial'  },
    { name: 'Hamachi',         desc: 'Pez limón, salsa ponzu, cebollino',                  price: '3,60 €', badge: null        },
    { name: 'Ebi',             desc: 'Gamba cocida, mayonesa wasabi',                      price: '2,90 €', badge: null        },
    { name: 'Wagyu Flameado',  desc: 'Ternera wagyu flambeada, sal negra de Hawái',        price: '5,50 €', badge: 'Chef'      },
    { name: 'Hotate',          desc: 'Vieira fresca, aceite de trufa blanca, limón',       price: '4,80 €', badge: 'Temporada' },
  ],
  rolls: [
    { name: 'Fuji Roll',       desc: 'Salmón, aguacate, pepino, tobiko, crema de queso',  price: '14,50 €', badge: 'Firma'   },
    { name: 'Museko Black',    desc: 'Arroz negro, anguila, mango, salsa teriyaki',        price: '16,00 €', badge: 'Firma'   },
    { name: 'Spicy Tuna',      desc: 'Atún, sriracha, cebollino, sésamo tostado',          price: '13,80 €', badge: null      },
    { name: 'Tempura Ebi',     desc: 'Gamba en tempura, lechuga, pepino, mayo',            price: '12,50 €', badge: null      },
    { name: 'Dragon Roll',     desc: 'Anguila, aguacate laminado, salsa eel',              price: '15,50 €', badge: null      },
    { name: 'Rainbow Roll',    desc: 'California base, variedad de pescado sobre maki',    price: '17,00 €', badge: null      },
  ],
  especiales: [
    { name: 'Sashimi Fuji',    desc: 'Selección del chef: 12 piezas de pescado del día',  price: '22,00 €', badge: 'Chef'    },
    { name: 'Tartar de Atún',  desc: 'Atún rojo, aguacate, soja trufada, chips wonton',   price: '16,50 €', badge: null      },
    { name: 'Gyoza Ibérica',   desc: 'Dumpling de cerdo ibérico, ponzu agridulce',        price: '9,50 €',  badge: null      },
    { name: 'Edamame Trufado', desc: 'Salteado con aceite de trufa y sal de hierbas',     price: '7,00 €',  badge: null      },
    { name: 'Miso Ramen Fuji', desc: 'Caldo dashi, miso blanco, tofu, wakame, huevo onsen', price: '14,00 €', badge: null    },
    { name: 'Menú Omakase',    desc: 'Experiencia de 10 pasos seleccionada por el chef',  price: '65,00 €', badge: 'Especial'},
  ],
};
