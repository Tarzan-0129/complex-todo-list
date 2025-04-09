export const TaskService = {
    getTasksData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'Task Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5,
                startDate: new Date('2024-04-01'),
                endDate: new Date('2024-04-10'),
                status: ''
            },
            {
                id: '1002',
                code: 'zz21cz3c1',
                name: 'Blue Band',
                description: 'Task Description',
                image: 'blue-band.jpg',
                price: 79,
                category: 'Fitness',
                quantity: 2,
                inventoryStatus: 'LOWSTOCK',
                rating: 3,
                startDate: new Date('2024-04-02'),
                endDate: new Date('2024-04-07'),
                status: ''
            },
            {
                id: '1029',
                code: 'gwuby345v',
                name: 'Yoga Set',
                description: 'Task Description',
                image: 'yoga-set.jpg',
                price: 20,
                category: 'Fitness',
                quantity: 25,
                inventoryStatus: 'INSTOCK',
                rating: 8,
                startDate: new Date('2024-04-03'),
                endDate: new Date('2024-04-05'),
                status: ''
            }
        ];
    },   
  
    getTasksWithOrdersData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'Task Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5,
                orders: [
                    {
                        id: '1000-0',
                        TaskCode: 'f230fh0g3',
                        date: '2020-09-13',
                        amount: 65,
                        quantity: 1,
                        customer: 'David James',
                        status: ''
                    },
                    {
                        id: '1000-1',
                        TaskCode: 'f230fh0g3',
                        date: '2020-05-14',
                        amount: 130,
                        quantity: 2,
                        customer: 'Leon Rodrigues',
                        status: ''
                    },
                    {
                        id: '1000-2',
                        TaskCode: 'f230fh0g3',
                        date: '2019-01-04',
                        amount: 65,
                        quantity: 1,
                        customer: 'Juan Alejandro',
                        status: ''
                    },
                    {
                        id: '1000-3',
                        TaskCode: 'f230fh0g3',
                        date: '2020-09-13',
                        amount: 195,
                        quantity: 3,
                        customer: 'Claire Morrow',
                        status: ''
                    }
                ]
            },
            
            {
                id: '1029',
                code: 'gwuby345v',
                name: 'Yoga Set',
                description: 'Task Description',
                image: 'yoga-set.jpg',
                price: 20,
                category: 'Fitness',
                quantity: 25,
                inventoryStatus: 'INSTOCK',
                rating: 8,
                orders: [
                    {
                        id: '1029-0',
                        TaskCode: 'gwuby345v',
                        date: '2020-02-14',
                        amount: 4,
                        quantity: 80,
                        customer: 'Maryann Royster',
                        status: ''
                    }
                ]
            }
        ];
    },
  
    getTasksMini() {
        return Promise.resolve(this.getTasksData().slice(0, 5));
    },
  
    getTasksSmall() {
        return Promise.resolve(this.getTasksData().slice(0, 10));
    },
  
    getTasks() {
        return Promise.resolve(this.getTasksData());
    },
  
    getTasksWithOrdersSmall() {
        return Promise.resolve(this.getTasksWithOrdersData().slice(0, 10));
    },
  
    getTasksWithOrders() {
        return Promise.resolve(this.getTasksWithOrdersData());
    }
  };
  
  