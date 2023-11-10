import { Quality } from '@/model/type';

export default interface Item {
  item: {
    key: {
      href: string;
    };
    id: number;
  };
  slot: {
    type: string;
    name: string;
  };
  quantity: number;
  quality: {
    type: string;
    name: Quality;
  };
  name?: string; // Optional property
  media: {
    key: {
      href: string;
    };
    id: number; // Optional property
    url?: string;
  };
  item_class?: {
    key?: {
      href?: string; // Optional property
    };
    name?: string; // Optional property
    id?: number; // Optional property
  };
  item_subclass?: {
    key?: {
      href?: string; // Optional property
    };
    name?: string;
    id?: number;
  };
  inventory_type?: {
    type: string;
    name: string;
  };
  binding?: {
    type: string;
    name: string;
  };
  armor?: {
    value: number;
    display: {
      display_string: string;
      color: {
        r: number;
        g: number;
        b: number;
        a: number;
      };
    };
  };
  stats?: [
    {
      type: { type: string; name: string };
      value: number;
      display: {
        display_string: string;
        color: { r: number; g: number; b: number; a: number };
      };
    },
  ];
  spells?: [
    {
      spell: { key: { href: string }; name: string; id: number };
      description: string;
    },
  ];
  sell_price: {
    value: number;
    display_strings: {
      header: string;
      gold: string;
      silver: string;
      copper: string;
    };
  };
  requirements: {
    level: {
      value: number;
      display_string: string;
    };
  };
  durability: {
    value: number;
    display_string: string;
  };
  weapon?: {
    damage: {
      min_value: number;
      max_value: number;
      display_string: string;
      damage_class: {
        type: string;
        name: string;
      };
    };
    attack_speed: {
      value: number;
      display_string: string;
    };
    dps: {
      value: number;
      display_string: string;
    };
  };
}
