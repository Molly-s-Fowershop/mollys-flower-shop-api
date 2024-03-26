import { PrismaClient } from '@prisma/client';

('Mollys flower shop db seeder');

const prisma = new PrismaClient();

type productDefinition = {
  name: string;
  description: string;
  categoryId: number;
  productDetails: {
    create: {
      price: number;
      stock: number;
    };
  };
};

const createManyProducts = async (products: productDefinition[]) => {
  const promises = [];

  for (const product of products) {
    promises.push(
      prisma.product.create({
        data: product,
      }),
    );
  }

  return Promise.all(promises);
};

const main = async () => {
  try {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    await prisma.category.createMany({
      data: [
        {
          name: 'Bouquet of flowers',
          description: 'A set of flowers',
        },
        {
          name: 'Decorations',
          description: 'Flower decorations',
        },
      ],
    });

    await createManyProducts([
      {
        name: 'Rose bouquet',
        description: 'A bouquet of roses',
        categoryId: 1,
        productDetails: {
          create: {
            price: 19.99,
            stock: 10,
          },
        },
      },
      {
        name: 'Tulip bouquet',
        description: 'A bouquet of tulips',
        categoryId: 1,
        productDetails: {
          create: {
            price: 15.99,
            stock: 5,
          },
        },
      },
      {
        name: 'Sunflower bouquet',
        description: 'A bouquet of sunflowers',
        categoryId: 1,
        productDetails: {
          create: {
            price: 14.99,
            stock: 7,
          },
        },
      },
      {
        name: 'Rose decoration',
        description: 'A rose decoration',
        categoryId: 2,
        productDetails: {
          create: {
            price: 9.99,
            stock: 10,
          },
        },
      },
      {
        name: 'Tulip decoration',
        description: 'A tulip decoration',
        categoryId: 2,
        productDetails: {
          create: {
            price: 7.99,
            stock: 5,
          },
        },
      },
      {
        name: 'Lily bouquet',
        description: 'A bouquet of lilies',
        categoryId: 1,
        productDetails: {
          create: {
            price: 24.99,
            stock: 8,
          },
        },
      },
      {
        name: 'Hydrangea bouquet',
        description: 'A bouquet of hydrangeas',
        categoryId: 1,
        productDetails: {
          create: {
            price: 18.99,
            stock: 12,
          },
        },
      },
      {
        name: 'Mixed flower bouquet',
        description: 'A bouquet of various seasonal flowers',
        categoryId: 1,
        productDetails: {
          create: {
            price: 29.99,
            stock: 5,
          },
        },
      },
      {
        name: 'Table centerpiece',
        description: 'A floral centerpiece for a table',
        categoryId: 2,
        productDetails: {
          create: {
            price: 14.99,
            stock: 15,
          },
        },
      },
      {
        name: 'Wreath',
        description: 'A decorative wreath for a door or wall',
        categoryId: 2,
        productDetails: {
          create: {
            price: 22.99,
            stock: 8,
          },
        },
      },
      {
        name: 'Potpourri',
        description: 'A fragrant potpourri for home decoration',
        categoryId: 2,
        productDetails: {
          create: {
            price: 9.99,
            stock: 20,
          },
        },
      },
      {
        name: 'Mini floral arrangement',
        description: 'A small flower arrangement for a desk or shelf',
        categoryId: 1,
        productDetails: {
          create: {
            price: 12.99,
            stock: 10,
          },
        },
      },
      {
        name: 'Bonsai tree',
        description: 'A small, decorative tree',
        categoryId: 2,
        productDetails: {
          create: {
            price: 39.99,
            stock: 3,
          },
        },
      },
      {
        name: 'Succulent arrangement',
        description: 'A low-maintenance arrangement of succulents',
        categoryId: 2,
        productDetails: {
          create: {
            price: 17.99,
            stock: 7,
          },
        },
      },
      {
        name: 'Dried flower bouquet',
        description: 'A bouquet of dried flowers for a long-lasting display',
        categoryId: 1,
        productDetails: {
          create: {
            price: 21.99,
            stock: 9,
          },
        },
      },
    ]);
  } catch (err) {
    console.error(err);
  }
};

main().catch((err) => {
  console.warn('Error While generating Seed: \n', err);
});
