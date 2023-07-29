# School App Backend

Proyecto demo con el uso de diferentes tecnologías con GraphQL y Apollo Server.

## Uso

Para correr el sistema se deberan de usar los siguiente comandos. Es necesario el uso de Node 18 y npm dentro del host

```bash
npm install
npx prisma generate
npm start
```

## Pruebas Unitarias

```bash
 npx jest --coverage=true
```
### Resultados
```bash
 PASS  src/test/score/query.spec.ts (13.037 s)
 PASS  src/test/student/mutation.spec.ts (13.075 s)
 PASS  src/test/score/mutation.spec.ts (13.081 s)
 PASS  src/test/user/query.spec.ts (13.153 s)
 PASS  src/test/student/query.spec.ts (13.165 s)
 PASS  src/test/assignment/query.spec.ts (13.172 s)
 PASS  src/test/course/mutation.spec.ts (13.213 s)
 PASS  src/test/professor/mutation.spec.ts (13.272 s)
 PASS  src/test/professor/query.spec.ts (13.29 s)
 PASS  src/test/assignment/mutation.spec.ts (13.443 s)
 PASS  src/test/course/query.spec.ts (13.529 s)
-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------|---------|----------|---------|---------|-------------------
All files                |   79.25 |    53.84 |   27.84 |   75.56 |                   
 config                  |     100 |      100 |     100 |     100 |                   
  context.ts             |     100 |      100 |     100 |     100 |                   
 db/entities             |   74.46 |      100 |       0 |   70.73 |                   
  Assignment.ts          |      70 |      100 |       0 |   66.66 | 10,13,16,19,22,25 
  Course.ts              |   71.42 |      100 |       0 |   66.66 | 7,10,13,16        
  Professor.ts           |   78.57 |      100 |       0 |      75 | 8,15,18           
  Score.ts               |   73.33 |      100 |       0 |   69.23 | 9,12,15,18        
  Student.ts             |   73.68 |      100 |       0 |   70.58 | 10,17,20,23,26    
  User.ts                |   83.33 |      100 |       0 |      80 | 8,15              
 resolvers/mutation      |   89.68 |      100 |   43.47 |   86.45 |                   
  assignment_mutation.ts |      90 |      100 |      50 |   86.36 | 48,60,73          
  course_mutation.ts     |      88 |      100 |      40 |   84.21 | 44-51,64          
  professor_mutation.ts  |      88 |      100 |      40 |   84.21 | 45-52,65          
  score_mutation.ts      |   95.23 |      100 |      50 |   94.11 | 27                
  student_mutation.ts    |      88 |      100 |      40 |   84.21 | 38-45,58          
 resolvers/query         |   69.07 |    14.28 |   35.48 |   66.26 |                   
  assignment_query.ts    |      55 |        0 |   33.33 |   52.94 | 15-32,39          
  course_query.ts        |   78.57 |      100 |      40 |      75 | 19-26,33          
  professor_query.ts     |   78.57 |      100 |      40 |      75 | 14-22,27          
  score_query.ts         |   88.88 |      100 |      50 |   85.71 | 14                
  student_query.ts       |   54.54 |        0 |   28.57 |   52.63 | 20-33,39-46,52    
  user.ts                |   77.77 |      100 |   33.33 |      75 | 11,13-16,26       
-------------------------|---------|----------|---------|---------|-------------------

Test Suites: 11 passed, 11 total
Tests:       24 passed, 24 total
Snapshots:   0 total
Time:        14.093 s
Ran all test suites.
```
