export const ProjectService = {
  getProjectsData() {
      return [
          {
              id: '1000',
              code: 'f230fh0g3',
              name: 'Bamboo Watch',
              description: 'Project Description',
              image: 'bamboo-watch.jpg',
              price: 65,
              category: 'Accessories',
              quantity: 24,
              inventoryStatus: 'INSTOCK',
              rating: 5
          },
         
          {
              id: '1002',
              code: 'zz21cz3c1',
              name: 'Blue Band',
              description: 'Project Description',
              image: 'blue-band.jpg',
              price: 79,
              category: 'Fitness',
              quantity: 2,
              inventoryStatus: 'LOWSTOCK',
              rating: 3
          },
          {
              id: '1029',
              code: 'gwuby345v',
              name: 'Yoga Set',
              description: 'Project Description',
              image: 'yoga-set.jpg',
              price: 20,
              category: 'Fitness',
              quantity: 25,
              inventoryStatus: 'INSTOCK',
              rating: 8
          }, 
    
      ];
  },

  getProjectsWithOrdersData() {
      return [
          {
              id: '1000',
              code: 'f230fh0g3',
              name: 'Bamboo Watch',
              description: 'Project Description',
              image: 'bamboo-watch.jpg',
              price: 65,
              category: 'Accessories',
              quantity: 24,
              inventoryStatus: 'INSTOCK',
              rating: 5,
              orders: [
                  {
                      id: '1000-0',
                      ProjectCode: 'f230fh0g3',
                      date: '2020-09-13',
                      amount: 65,
                      quantity: 1,
                      customer: 'David James',
                      status: 'PENDING'
                },
                  {
                      id: '1000-1',
                      ProjectCode: 'f230fh0g3',
                      date: '2020-05-14',
                      amount: 130,
                      quantity: 2,
                      customer: 'Leon Rodrigues',
                      status: 'DELIVERED'
                  },
                  {
                      id: '1000-2',
                      ProjectCode: 'f230fh0g3',
                      date: '2019-01-04',
                      amount: 65,
                      quantity: 1,
                      customer: 'Juan Alejandro',
                      status: 'RETURNED'
                  },
                  {
                      id: '1000-3',
                      ProjectCode: 'f230fh0g3',
                      date: '2020-09-13',
                      amount: 195,
                      quantity: 3,
                      customer: 'Claire Morrow',
                      status: 'CANCELLED'
                  }
              ]
          },
          
          {
              id: '1029',
              code: 'gwuby345v',
              name: 'Yoga Set',
              description: 'Project Description',
              image: 'yoga-set.jpg',
              price: 20,
              category: 'Fitness',
              quantity: 25,
              inventoryStatus: 'INSTOCK',
              rating: 8,
              orders: [
                  {
                      id: '1029-0',
                      ProjectCode: 'gwuby345v',
                      date: '2020-02-14',
                      amount: 4,
                      quantity: 80,
                      customer: 'Maryann Royster',
                      status: 'DELIVERED'
                  }
              ]
          }
      ];
  },

  getProjectsMini() {
      return Promise.resolve(this.getProjectsData().slice(0, 5));
  },

  getProjectsSmall() {
      return Promise.resolve(this.getProjectsData().slice(0, 10));
  },

  getProjects() {
      return Promise.resolve(this.getProjectsData());
  },

  getProjectsWithOrdersSmall() {
      return Promise.resolve(this.getProjectsWithOrdersData().slice(0, 10));
  },

  getProjectsWithOrders() {
      return Promise.resolve(this.getProjectsWithOrdersData());
  }
};

