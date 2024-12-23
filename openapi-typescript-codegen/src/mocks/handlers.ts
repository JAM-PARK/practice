// src/mocks/handlers.ts
import { DefaultBodyType, http, HttpResponse } from 'msw';

type Body = DefaultBodyType & {
  name: string
}

export const handlers = [
  // GET /api/users
  http.get('/api/users', () => {
    const mockData = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];

    return HttpResponse.json(mockData, { status: 200 });
  }),

  // GET /api/users/:id
  http.get('/api/users/:id', (req) => {
    const { id } = req.params;
    const userId = Number(id);

    if (userId === 1) {
      return HttpResponse.json({ id: 1, name: 'Alice' }, { status: 200 });
    } else {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 });
    }
  }),

  // POST /api/users
  http.post('/api/users', async ({ request }) => {
    const body = await request.json() as Body;
    if (!body || !body.name) {
      return HttpResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    const newUser = { id: 3, name: body.name };

    return HttpResponse.json(newUser, { status: 201 });
  }),
];
