/**
 * Generated by orval v6.9.0 🍺
 * Do not edit manually.
 * Swagger Petstore
 * OpenAPI spec version: 1.0.0
 */
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { Pets, ListPetsParams, CreatePetsBody, Pet } from '../model';
import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import listPetsMutator from '../mutator/response-type';

/**
 * @summary List all pets
 */
export const listPets = (params?: ListPetsParams, version = 1) => {
  return listPetsMutator<Pets>({
    url: `/v${version}/pets`,
    method: 'get',
    params,
  });
};

/**
 * @summary Create a pet
 */
export const createPets = <TData = AxiosResponse<void>>(
  createPetsBody: CreatePetsBody,
  version = 1,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.post(`/v${version}/pets`, createPetsBody, options);
};

/**
 * @summary Info for a specific pet
 */
export const showPetById = <TData = AxiosResponse<Pet>>(
  petId: string,
  version = 1,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/v${version}/pets/${petId}`, options);
};

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

export type ListPetsResult = NonNullable<Awaited<ReturnType<typeof listPets>>>;
export type CreatePetsResult = AxiosResponse<void>;
export type ShowPetByIdResult = AxiosResponse<Pet>;

export const getListPetsMock = () =>
  Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    id: faker.datatype.number({ min: undefined, max: undefined }),
    name: 'jon',
    tag: 'jon',
  }));

export const getShowPetByIdMock = () =>
  (() => ({
    id: faker.datatype.number({ min: 1, max: 99 }),
    name: faker.name.firstName(),
    tag: faker.helpers.arrayElement([faker.random.word(), void 0]),
  }))();

export const getSwaggerPetstoreMSW = () => [
  rest.get('*/v:version/pets', (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, 'Mocked status'),
      ctx.json(getListPetsMock()),
    );
  }),
  rest.post('*/v:version/pets', (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, 'Mocked status'));
  }),
  rest.get('*/v:version/pets/:petId', (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, 'Mocked status'),
      ctx.json(getShowPetByIdMock()),
    );
  }),
];
