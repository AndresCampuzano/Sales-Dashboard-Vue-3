/**
 * @description Colors available for the items
 * @constant
 * @readonly
 */
export const COLORS = [
  {
    label: 'Rojo',
    color: '#a42222'
  },
  {
    label: 'Azul',
    color: '#2121b0'
  },
  {
    label: 'Verde',
    color: '#24a124'
  },
  {
    label: 'Amarillo',
    color: '#e0e010'
  },
  {
    label: 'Morado',
    color: '#b622b6'
  },
  {
    label: 'Blanco',
    color: '#ffffff',
    textColor: '#000000'
  },
  {
    label: 'Cafe',
    color: '#52302a'
  },
  {
    label: 'Naranja',
    color: '#e07c10'
  },
  {
    label: 'Rosado',
    color: '#d272d5'
  },
  {
    label: 'Negro',
    color: '#070707',
    textColor: '#fafafa'
  },
  {
    label: 'Otro',
    color: '#a6a6a6',
    textColor: '#ffffff'
  }
]

/**
 * @description Expenses Types
 * @constant
 * @readonly
 */
export const EXPENSES_TYPES = [
  {
    label: 'Anuncio de Instagram',
    value: 'instagram_ad'
  },
  {
    label: 'Anuncio de Facebook',
    value: 'facebook_ad'
  },
  {
    label: 'Otro',
    value: 'other'
  }
]

/**
 * @description Currencies
 * @constant
 * @readonly
 */
export const CURRENCIES = [
  {
    // label: 'Peso Colombiano',
    value: 'COP' // Default currency
  },
  {
    // label: 'Dolar Australiano',
    value: 'AUD'
  },
  {
    // label: 'Won Coreano',
    value: 'KRW'
  }
]

/**
 * @description Places available for the clients in CO
 * @constant
 * @readonly
 */
export const CO_PLACES = [
  {
    id: 0,
    department: 'Amazonas',
    cities: ['Leticia', 'Puerto Narino']
  },
  {
    id: 1,
    department: 'Antioquia',
    cities: [
      'Abejorral',
      'Abriaqui',
      'Alejandria',
      'Amaga',
      'Amalfi',
      'Andes',
      'Angelopolis',
      'Angostura',
      'Anori',
      'Anza',
      'Apartado',
      'Arboletes',
      'Argelia',
      'Armenia',
      'Barbosa',
      'Bello',
      'Belmira',
      'Betania',
      'Betulia',
      'Briceno',
      'Buritica',
      'Caceres',
      'Caicedo',
      'Caldas',
      'Campamento',
      'Canasgordas',
      'Caracoli',
      'Caramanta',
      'Carepa',
      'Carolina del Principe',
      'Caucasia',
      'Chigorodo',
      'Cisneros',
      'Ciudad Bolivar',
      'Cocorna',
      'Concepcion',
      'Concordia',
      'Copacabana',
      'Dabeiba',
      'Donmatias',
      'Ebejico',
      'El Bagre',
      'El Carmen de Viboral',
      'El Penol',
      'El Retiro',
      'El Santuario',
      'Entrerrios',
      'Envigado',
      'Fredonia',
      'Frontino',
      'Giraldo',
      'Girardota',
      'Gomez Plata',
      'Granada',
      'Guadalupe',
      'Guarne',
      'Guatape',
      'Heliconia',
      'Hispania',
      'Itagui',
      'Ituango',
      'Jardin',
      'Jerico',
      'La Ceja',
      'La Estrella',
      'La Pintada',
      'La Union',
      'Liborina',
      'Maceo',
      'Marinilla',
      'Medellin',
      'Montebello',
      'Murindo',
      'Mutata',
      'Narino',
      'Nechi',
      'Necocli',
      'Olaya',
      'Peque',
      'Pueblorrico',
      'Puerto Berrio',
      'Puerto Nare',
      'Puerto Triunfo',
      'Remedios',
      'Rionegro',
      'Sabanalarga',
      'Sabaneta',
      'Salgar',
      'San Andres de Cuerquia',
      'San Carlos',
      'San Francisco',
      'San Jeronimo',
      'San Jose de la Montana',
      'San Juan de Uraba',
      'San Luis',
      'San Pedro de Uraba',
      'San Pedro de los Milagros',
      'San Rafael',
      'San Roque',
      'San Vicente',
      'Santa Barbara',
      'Santa Fe de Antioquia',
      'Santa Rosa de Osos',
      'Santo Domingo',
      'Segovia',
      'Sonson',
      'Sopetran',
      'Tamesis',
      'Taraza',
      'Tarso',
      'Titiribi',
      'Toledo',
      'Turbo',
      'Uramita',
      'Urrao',
      'Valdivia',
      'Valparaiso',
      'Vegachi',
      'Venecia',
      'Vigia del Fuerte',
      'Yali',
      'Yarumal',
      'Yolombo',
      'Yondo',
      'Zaragoza'
    ]
  },
  {
    id: 2,
    department: 'Arauca',
    cities: ['Arauca', 'Arauquita', 'Cravo Norte', 'Fortul', 'Puerto Rondon', 'Saravena', 'Tame']
  },
  {
    id: 3,
    department: 'Atlantico',
    cities: [
      'Baranoa',
      'Barranquilla',
      'Campo de la Cruz',
      'Candelaria',
      'Galapa',
      'Juan de Acosta',
      'Luruaco',
      'Malambo',
      'Manati',
      'Palmar de Varela',
      'Piojo',
      'Polonuevo',
      'Ponedera',
      'Puerto Colombia',
      'Repelon',
      'Sabanagrande',
      'Sabanalarga',
      'Santa Lucia',
      'Santo Tomas',
      'Soledad',
      'Suan',
      'Tubara',
      'Usiacuri'
    ]
  },
  {
    id: 4,
    department: 'Bolivar',
    cities: [
      'Achi',
      'Altos del Rosario',
      'Arenal',
      'Arjona',
      'Arroyohondo',
      'Barranco de Loba',
      'Brazuelo de Papayal',
      'Calamar',
      'Cantagallo',
      'Cartagena de Indias',
      'Cicuco',
      'Clemencia',
      'Cordoba',
      'El Carmen de Bolivar',
      'El Guamo',
      'El Penon',
      'Hatillo de Loba',
      'Magangue',
      'Mahates',
      'Margarita',
      'Maria la Baja',
      'Mompos',
      'Montecristo',
      'Morales',
      'Norosi',
      'Pinillos',
      'Regidor',
      'Rio Viejo',
      'San Cristobal',
      'San Estanislao',
      'San Fernando',
      'San Jacinto del Cauca',
      'San Jacinto',
      'San Juan Nepomuceno',
      'San Martin de Loba',
      'San Pablo',
      'Santa Catalina',
      'Santa Rosa',
      'Santa Rosa del Sur',
      'Simiti',
      'Soplaviento',
      'Talaigua Nuevo',
      'Tiquisio',
      'Turbaco',
      'Turbana',
      'Villanueva',
      'Zambrano'
    ]
  },
  {
    id: 5,
    department: 'Boyaca',
    cities: [
      'Almeida',
      'Aquitania',
      'Arcabuco',
      'Belen',
      'Berbeo',
      'Beteitiva',
      'Boavita',
      'Boyaca',
      'Briceno',
      'Buenavista',
      'Busbanza',
      'Caldas',
      'Campohermoso',
      'Cerinza',
      'Chinavita',
      'Chiquinquira',
      'Chiquiza',
      'Chiscas',
      'Chita',
      'Chitaraque',
      'Chivata',
      'Chivor',
      'Cienega',
      'Combita',
      'Coper',
      'Corrales',
      'Covarachia',
      'Cubara',
      'Cucaita',
      'Cuitiva',
      'Duitama',
      'El Cocuy',
      'El Espino',
      'Firavitoba',
      'Floresta',
      'Gachantiva',
      'Gameza',
      'Garagoa',
      'Guacamayas',
      'Guateque',
      'Guayata',
      'Guican',
      'Iza',
      'Jenesano',
      'Jerico',
      'La Capilla',
      'La Uvita',
      'La Victoria',
      'Labranzagrande',
      'Macanal',
      'Maripi',
      'Miraflores',
      'Mongua',
      'Mongui',
      'Moniquira',
      'Motavita',
      'Muzo',
      'Nobsa',
      'Nuevo Colon',
      'Oicata',
      'Otanche',
      'Pachavita',
      'Paez',
      'Paipa',
      'Pajarito',
      'Panqueba',
      'Pauna',
      'Paya',
      'Paz del Rio',
      'Pesca',
      'Pisba',
      'Puerto Boyaca',
      'Quipama',
      'Ramiriqui',
      'Raquira',
      'Rondon',
      'Saboya',
      'Sachica',
      'Samaca',
      'San Eduardo',
      'San Jose de Pare',
      'San Luis de Gaceno',
      'San Mateo',
      'San Miguel de Sema',
      'San Pablo de Borbur',
      'Santa Maria',
      'Santa Rosa de Viterbo',
      'Santa Sofia',
      'Santana',
      'Sativanorte',
      'Sativasur',
      'Siachoque',
      'Soata',
      'Socha',
      'Socota',
      'Sogamoso',
      'Somondoco',
      'Sora',
      'Soraca',
      'Sotaquira',
      'Susacon',
      'Sutamarchan',
      'Sutatenza',
      'Tasco',
      'Tenza',
      'Tibana',
      'Tibasosa',
      'Tinjaca',
      'Tipacoque',
      'Toca',
      'Togui',
      'Topaga',
      'Tota',
      'Tunja',
      'Tunungua',
      'Turmeque',
      'Tuta',
      'Tutaza',
      '\u00dambita',
      'Ventaquemada',
      'Villa de Leyva',
      'Viracacha',
      'Zetaquira'
    ]
  },
  {
    id: 6,
    department: 'Caldas',
    cities: [
      'Aguadas',
      'Anserma',
      'Aranzazu',
      'Belalcazar',
      'Chinchina',
      'Filadelfia',
      'La Dorada',
      'La Merced',
      'Manizales',
      'Manzanares',
      'Marmato',
      'Marquetalia',
      'Marulanda',
      'Neira',
      'Norcasia',
      'Pacora',
      'Palestina',
      'Pensilvania',
      'Riosucio',
      'Risaralda',
      'Salamina',
      'Samana',
      'San Jose',
      'Supia',
      'Victoria',
      'Villamaria',
      'Viterbo'
    ]
  },
  {
    id: 7,
    department: 'Caqueta',
    cities: [
      'Albania',
      'Belen de los Andaquies',
      'Cartagena del Chaira',
      'Curillo',
      'El Doncello',
      'El Paujil',
      'Florencia',
      'La Montanita',
      'Milan',
      'Morelia',
      'Puerto Rico',
      'San Jose del Fragua',
      'San Vicente del Caguan',
      'Solano',
      'Solita',
      'Valparaiso'
    ]
  },
  {
    id: 8,
    department: 'Casanare',
    cities: [
      'Aguazul',
      'Chameza',
      'Hato Corozal',
      'La Salina',
      'Mani',
      'Monterrey',
      'Nunchia',
      'Orocue',
      'Paz de Ariporo',
      'Pore',
      'Recetor',
      'Sabanalarga',
      'Sacama',
      'San Luis de Palenque',
      'Tamara',
      'Tauramena',
      'Trinidad',
      'Villanueva',
      'Yopal'
    ]
  },
  {
    id: 9,
    department: 'Cauca',
    cities: [
      'Almaguer',
      'Argelia',
      'Balboa',
      'Bolivar',
      'Buenos Aires',
      'Cajibio',
      'Caldono',
      'Caloto',
      'Corinto',
      'El Tambo',
      'Florencia',
      'Guachene',
      'Guapi',
      'Inza',
      'Jambalo',
      'La Sierra',
      'La Vega',
      'Lopez de Micay',
      'Mercaderes',
      'Miranda',
      'Morales',
      'Padilla',
      'Paez',
      'Patia',
      'Piamonte',
      'Piendamo',
      'Popayan',
      'Puerto Tejada',
      'Purace',
      'Rosas',
      'San Sebastian',
      'Santa Rosa',
      'Santander de Quilichao',
      'Silvia',
      'Sotara',
      'Suarez',
      'Sucre',
      'Timbio',
      'Timbiqui',
      'Toribio',
      'Totoro',
      'Villa Rica'
    ]
  },
  {
    id: 10,
    department: 'Cesar',
    cities: [
      'Aguachica',
      'Agustin Codazzi',
      'Astrea',
      'Becerril',
      'Bosconia',
      'Chimichagua',
      'Chiriguana',
      'Curumani',
      'El Copey',
      'El Paso',
      'Gamarra',
      'Gonzalez',
      'La Gloria (Cesar)',
      'La Jagua de Ibirico',
      'La Paz',
      'Manaure Balcon del Cesar',
      'Pailitas',
      'Pelaya',
      'Pueblo Bello',
      'Rio de Oro',
      'San Alberto',
      'San Diego',
      'San Martin',
      'Tamalameque',
      'Valledupar'
    ]
  },
  {
    id: 11,
    department: 'Choco',
    cities: [
      'Acandi',
      'Alto Baudo',
      'Bagado',
      'Bahia Solano',
      'Bajo Baudo',
      'Bojaya',
      'Canton de San Pablo',
      'Certegui',
      'Condoto',
      'El Atrato',
      'El Carmen de Atrato',
      'El Carmen del Darien',
      'Istmina',
      'Jurado',
      'Litoral de San Juan',
      'Lloro',
      'Medio Atrato',
      'Medio Baudo',
      'Medio San Juan',
      'Novita',
      'Nuqui',
      'Quibdo',
      'Rio Iro',
      'Rio Quito',
      'Riosucio',
      'San Jose del Palmar',
      'Sipi',
      'Tado',
      'Union Panamericana',
      'Unguia'
    ]
  },
  {
    id: 12,
    department: 'Cundinamarca',
    cities: [
      'Agua de Dios',
      'Alban',
      'Anapoima',
      'Anolaima',
      'Apulo',
      'Arbelaez',
      'Beltran',
      'Bituima',
      'Bogota',
      'Bojaca',
      'Cabrera',
      'Cachipay',
      'Cajica',
      'Caparrapi',
      'Caqueza',
      'Carmen de Carupa',
      'Chaguani',
      'Chia',
      'Chipaque',
      'Choachi',
      'Choconta',
      'Cogua',
      'Cota',
      'Cucunuba',
      'El Colegio',
      'El Penon',
      'El Rosal',
      'Facatativa',
      'Fomeque',
      'Fosca',
      'Funza',
      'F\u00faquene',
      'Fusagasuga',
      'Gachala',
      'Gachancipa',
      'Gacheta',
      'Gama',
      'Girardot',
      'Granada',
      'Guacheta',
      'Guaduas',
      'Guasca',
      'Guataqui',
      'Guatavita',
      'Guayabal de Siquima',
      'Guayabetal',
      'Gutierrez',
      'Jerusalen',
      'Junin',
      'La Calera',
      'La Mesa',
      'La Palma',
      'La Pena',
      'La Vega',
      'Lenguazaque',
      'Macheta',
      'Madrid',
      'Manta',
      'Medina',
      'Mosquera',
      'Narino',
      'Nemocon',
      'Nilo',
      'Nimaima',
      'Nocaima',
      'Pacho',
      'Paime',
      'Pandi',
      'Paratebueno',
      'Pasca',
      'Puerto Salgar',
      'Puli',
      'Quebradanegra',
      'Quetame',
      'Quipile',
      'Ricaurte',
      'San Antonio del Tequendama',
      'San Bernardo',
      'San Cayetano',
      'San Francisco',
      'San Juan de Rioseco',
      'Sasaima',
      'Sesquile',
      'Sibate',
      'Silvania',
      'Simijaca',
      'Soacha',
      'Sopo',
      'Subachoque',
      'Suesca',
      'Supata',
      'Susa',
      'Sutatausa',
      'Tabio',
      'Tausa',
      'Tena',
      'Tenjo',
      'Tibacuy',
      'Tibirita',
      'Tocaima',
      'Tocancipa',
      'Topaipi',
      'Ubala',
      'Ubaque',
      'Ubate',
      'Une',
      '\u00datica',
      'Venecia',
      'Vergara',
      'Viani',
      'Villagomez',
      'Villapinzon',
      'Villeta',
      'Viota',
      'Yacopi',
      'Zipacon',
      'Zipaquira'
    ]
  },
  {
    id: 13,
    department: 'Cordoba',
    cities: [
      'Ayapel',
      'Buenavista',
      'Canalete',
      'Cerete',
      'Chima',
      'Chin\u00fa',
      'Cienaga de Oro',
      'Cotorra',
      'La Apartada',
      'Lorica',
      'Los Cordobas',
      'Momil',
      'Montelibano',
      'Monteria',
      'Monitos',
      'Planeta Rica',
      'Pueblo Nuevo',
      'Puerto Escondido',
      'Puerto Libertador',
      'Purisima',
      'Sahag\u00fan',
      'San Andres de Sotavento',
      'San Antero',
      'San Bernardo del Viento',
      'San Carlos',
      'San Jose de Ure',
      'San Pelayo',
      'Tierralta',
      'Tuchin',
      'Valencia'
    ]
  },
  {
    id: 14,
    department: 'Guainia',
    cities: ['Inirida']
  },
  {
    id: 15,
    department: 'Guaviare',
    cities: ['Calamar', 'El Retorno', 'Miraflores', 'San Jose del Guaviare']
  },
  {
    id: 16,
    department: 'Huila',
    cities: [
      'Acevedo',
      'Agrado',
      'Aipe',
      'Algeciras',
      'Altamira',
      'Baraya',
      'Campoalegre',
      'Colombia',
      'El Pital',
      'Elias',
      'Garzon',
      'Gigante',
      'Guadalupe',
      'Hobo',
      '\u00cdquira',
      'Isnos',
      'La Argentina',
      'La Plata',
      'Nataga',
      'Neiva',
      'Oporapa',
      'Paicol',
      'Palermo',
      'Palestina',
      'Pitalito',
      'Rivera',
      'Saladoblanco',
      'San Agustin',
      'Santa Maria',
      'Suaza',
      'Tarqui',
      'Tello',
      'Teruel',
      'Tesalia',
      'Timana',
      'Villavieja',
      'Yaguara'
    ]
  },
  {
    id: 17,
    department: 'La Guajira',
    cities: [
      'Albania',
      'Barrancas',
      'Dibulla',
      'Distraccion',
      'El Molino',
      'Fonseca',
      'Hatonuevo',
      'La Jagua del Pilar',
      'Maicao',
      'Manaure',
      'Riohacha',
      'San Juan del Cesar',
      'Uribia',
      'Urumita',
      'Villanueva'
    ]
  },
  {
    id: 18,
    department: 'Magdalena',
    cities: [
      'Algarrobo',
      'Aracataca',
      'Ariguani',
      'Cerro de San Antonio',
      'Chibolo',
      'Chibolo',
      'Cienaga',
      'Concordia',
      'El Banco',
      'El Pinon',
      'El Reten',
      'Fundacion',
      'Guamal',
      'Nueva Granada',
      'Pedraza',
      'Pijino del Carmen',
      'Pivijay',
      'Plato',
      'Pueblo Viejo',
      'Remolino',
      'Sabanas de San \u00c1ngel',
      'Salamina',
      'San Sebastian de Buenavista',
      'San Zenon',
      'Santa Ana',
      'Santa Barbara de Pinto',
      'Santa Marta',
      'Sitionuevo',
      'Tenerife',
      'Zapayan',
      'Zona Bananera'
    ]
  },
  {
    id: 19,
    department: 'Meta',
    cities: [
      'Acacias',
      'Barranca de Upia',
      'Cabuyaro',
      'Castilla la Nueva',
      'Cubarral',
      'Cumaral',
      'El Calvario',
      'El Castillo',
      'El Dorado',
      'Fuente de Oro',
      'Granada',
      'Guamal',
      'La Macarena',
      'La Uribe',
      'Lejanias',
      'Mapiripan',
      'Mesetas',
      'Puerto Concordia',
      'Puerto Gaitan',
      'Puerto Lleras',
      'Puerto Lopez',
      'Puerto Rico',
      'Restrepo',
      'San Carlos de Guaroa',
      'San Juan de Arama',
      'San Juanito',
      'San Martin',
      'Villavicencio',
      'Vista Hermosa'
    ]
  },
  {
    id: 20,
    department: 'Narino',
    cities: [
      'Aldana',
      'Ancuya',
      'Arboleda',
      'Barbacoas',
      'Belen',
      'Buesaco',
      'Chachagui',
      'Colon',
      'Consaca',
      'Contadero',
      'Cordoba',
      'Cuaspud',
      'Cumbal',
      'Cumbitara',
      'El Charco',
      'El Penol',
      'El Rosario',
      'El Tablon',
      'El Tambo',
      'Francisco Pizarro',
      'Funes',
      'Guachucal',
      'Guaitarilla',
      'Gualmatan',
      'Iles',
      'Imues',
      'Ipiales',
      'La Cruz',
      'La Florida',
      'La Llanada',
      'La Tola',
      'La Union',
      'Leiva',
      'Linares',
      'Los Andes',
      'Magui Payan',
      'Mallama',
      'Mosquera',
      'Narino',
      'Olaya Herrera',
      'Ospina',
      'Pasto',
      'Policarpa',
      'Potosi',
      'Providencia',
      'Puerres',
      'Pupiales',
      'Ricaurte',
      'Roberto Payan',
      'Samaniego',
      'San Bernardo',
      'San Jose de Alban',
      'San Lorenzo',
      'San Pablo',
      'San Pedro de Cartago',
      'Sandona',
      'Santa Barbara',
      'Santacruz',
      'Sapuyes',
      'Taminango',
      'Tangua',
      'Tumaco',
      'T\u00faquerres',
      'Yacuanquer'
    ]
  },
  {
    id: 21,
    department: 'Norte de Santander',
    cities: [
      '\u00c1brego',
      'Arboledas',
      'Bochalema',
      'Bucarasica',
      'Cachira',
      'Cacota',
      'Chinacota',
      'Chitaga',
      'Convencion',
      'C\u00facuta',
      'Cucutilla',
      'Durania',
      'El Carmen',
      'El Tarra',
      'El Zulia',
      'Gramalote',
      'Hacari',
      'Herran',
      'La Esperanza',
      'La Playa de Belen',
      'Labateca',
      'Los Patios',
      'Lourdes',
      'Mutiscua',
      'Ocana',
      'Pamplona',
      'Pamplonita',
      'Puerto Santander',
      'Ragonvalia',
      'Salazar de Las Palmas',
      'San Calixto',
      'San Cayetano',
      'Santiago',
      'Santo Domingo de Silos',
      'Sardinata',
      'Teorama',
      'Tib\u00fa',
      'Toledo',
      'Villa Caro',
      'Villa del Rosario'
    ]
  },
  {
    id: 22,
    department: 'Putumayo',
    cities: [
      'Colon',
      'Mocoa',
      'Orito',
      'Puerto Asis',
      'Puerto Caicedo',
      'Puerto Guzman',
      'Puerto Leguizamo',
      'San Francisco',
      'San Miguel',
      'Santiago',
      'Sibundoy',
      'Valle del Guamuez',
      'Villagarzon'
    ]
  },
  {
    id: 23,
    department: 'Quindio',
    cities: [
      'Armenia',
      'Buenavista',
      'Calarca',
      'Circasia',
      'Cordoba',
      'Filandia',
      'Genova',
      'La Tebaida',
      'Montenegro',
      'Pijao',
      'Quimbaya',
      'Salento'
    ]
  },
  {
    id: 24,
    department: 'Risaralda',
    cities: [
      'Apia',
      'Balboa',
      'Belen de Umbria',
      'Dosquebradas',
      'Guatica',
      'La Celia',
      'La Virginia',
      'Marsella',
      'Mistrato',
      'Pereira',
      'Pueblo Rico',
      'Quinchia',
      'Santa Rosa de Cabal',
      'Santuario'
    ]
  },
  {
    id: 25,
    department: 'San Andres y Providencia',
    cities: ['Providencia y Santa Catalina Islas', 'San Andres']
  },
  {
    id: 26,
    department: 'Santander',
    cities: [
      'Aguada',
      'Albania',
      'Aratoca',
      'Barbosa',
      'Barichara',
      'Barrancabermeja',
      'Betulia',
      'Bolivar',
      'Bucaramanga',
      'Cabrera',
      'California',
      'Capitanejo',
      'Carcasi',
      'Cepita',
      'Cerrito',
      'Charala',
      'Charta',
      'Chima',
      'Chipata',
      'Cimitarra',
      'Concepcion',
      'Confines',
      'Contratacion',
      'Coromoro',
      'Curiti',
      'El Carmen de Chucuri',
      'El Guacamayo',
      'El Penon',
      'El Playon',
      'El Socorro',
      'Encino',
      'Enciso',
      'Florian',
      'Floridablanca',
      'Galan',
      'Gambita',
      'Giron',
      'Guaca',
      'Guadalupe',
      'Guapota',
      'Guavata',
      'Guepsa',
      'Hato',
      'Jes\u00fas Maria',
      'Jordan',
      'La Belleza',
      'La Paz',
      'Landazuri',
      'Lebrija',
      'Los Santos',
      'Macaravita',
      'Malaga',
      'Matanza',
      'Mogotes',
      'Molagavita',
      'Ocamonte',
      'Oiba',
      'Onzaga',
      'Palmar',
      'Palmas del Socorro',
      'Paramo',
      'Piedecuesta',
      'Pinchote',
      'Puente Nacional',
      'Puerto Parra',
      'Puerto Wilches',
      'Rionegro',
      'Sabana de Torres',
      'San Andres',
      'San Benito',
      'San Gil',
      'San Joaquin',
      'San Jose de Miranda',
      'San Miguel',
      'San Vicente de Chucuri',
      'Santa Barbara',
      'Santa Helena del Opon',
      'Simacota',
      'Suaita',
      'Sucre',
      'Surata',
      'Tona',
      'Valle de San Jose',
      'Velez',
      'Vetas',
      'Villanueva',
      'Zapatoca'
    ]
  },
  {
    id: 27,
    department: 'Sucre',
    cities: [
      'Buenavista',
      'Caimito',
      'Chalan',
      'Coloso',
      'Corozal',
      'Covenas',
      'El Roble',
      'Galeras',
      'Guaranda',
      'La Union',
      'Los Palmitos',
      'Majagual',
      'Morroa',
      'Ovejas',
      'Sampues',
      'San Antonio de Palmito',
      'San Benito Abad',
      'San Juan de Betulia',
      'San Marcos',
      'San Onofre',
      'San Pedro',
      'Since',
      'Sincelejo',
      'Sucre',
      'Tol\u00fa',
      'Tol\u00fa Viejo'
    ]
  },
  {
    id: 28,
    department: 'Tolima',
    cities: [
      'Alpujarra',
      'Alvarado',
      'Ambalema',
      'Anzoategui',
      'Armero',
      'Ataco',
      'Cajamarca',
      'Carmen de Apicala',
      'Casabianca',
      'Chaparral',
      'Coello',
      'Coyaima',
      'Cunday',
      'Dolores',
      'El Espinal',
      'Falan',
      'Flandes',
      'Fresno',
      'Guamo',
      'Herveo',
      'Honda',
      'Ibague',
      'Icononzo',
      'Lerida',
      'Libano',
      'Mariquita',
      'Melgar',
      'Murillo',
      'Natagaima',
      'Ortega',
      'Palocabildo',
      'Piedras',
      'Planadas',
      'Prado',
      'Purificacion',
      'Rioblanco',
      'Roncesvalles',
      'Rovira',
      'Saldana',
      'San Antonio',
      'San Luis',
      'Santa Isabel',
      'Suarez',
      'Valle de San Juan',
      'Venadillo',
      'Villahermosa',
      'Villarrica'
    ]
  },
  {
    id: 29,
    department: 'Valle del Cauca',
    cities: [
      'Alcala',
      'Andalucia',
      'Ansermanuevo',
      'Argelia',
      'Bolivar',
      'Buenaventura',
      'Buga',
      'Bugalagrande',
      'Caicedonia',
      'Cali',
      'Calima',
      'Candelaria',
      'Cartago',
      'Dagua',
      'El \u00c1guila',
      'El Cairo',
      'El Cerrito',
      'El Dovio',
      'Florida',
      'Ginebra',
      'Guacari',
      'Jamundi',
      'La Cumbre',
      'La Union',
      'La Victoria',
      'Obando',
      'Palmira',
      'Pradera',
      'Restrepo',
      'Riofrio',
      'Roldanillo',
      'San Pedro',
      'Sevilla',
      'Toro',
      'Trujillo',
      'Tulua',
      'Ulloa',
      'Versalles',
      'Vijes',
      'Yotoco',
      'Yumbo',
      'Zarzal'
    ]
  },
  {
    id: 30,
    department: 'Vaupes',
    cities: ['Carur\u00fa', 'Mit\u00fa', 'Taraira']
  },
  {
    id: 31,
    department: 'Vichada',
    cities: ['Cumaribo', 'La Primavera', 'Puerto Carreno', 'Santa Rosalia']
  }
]