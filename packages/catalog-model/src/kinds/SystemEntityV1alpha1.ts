/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as yup from 'yup';
import type { Entity } from '../entity/Entity';
import { schemaValidator } from './util';

export interface SystemEntityV1alpha1 {}

const API_VERSION = ['backstage.io/v1alpha1', 'backstage.io/v1beta1'] as const;
const KIND = 'System' as const;

const schema = yup.object<Partial<SystemEntityV1alpha1>>({
  apiVersion: yup.string().required().oneOf(API_VERSION),
  kind: yup.string().required().equals([KIND]),
  spec: yup
    .object({
      lifecycle: yup.string().required().min(1),
      owner: yup.string().required().min(1),
      contains: yup.array(yup.string().required()).notRequired(),
      partOf: yup.string().notRequired().min(1),
    })
    .required(),
});

export interface SystemEntityV1alpha1 extends Entity {
  apiVersion: typeof API_VERSION[number];
  kind: typeof KIND;
  spec: {
    lifecycle: string;
    owner: string;
    contains?: string[];
    partOf?: string;
  };
}

export const systemEntityV1alpha1Validator = schemaValidator(
  KIND,
  API_VERSION,
  schema,
);
