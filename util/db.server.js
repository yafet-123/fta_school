import { PrismaClient } from '@prisma/client'

let prisma;

<<<<<<< HEAD
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export { prisma };
=======
//check if we are running in production mode
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
//check if there is already a connection to the database
  if (!global.db) {
    global.db = new PrismaClient()
  }
  prisma = global.db
}

export { prisma };
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
