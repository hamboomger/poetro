# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/hamboomger/poetro/compare/v1.4.0...v2.0.0) (2021-04-17)


### ⚠ BREAKING CHANGES

* **server:** GET /api/tags route now includes tags colors

### Features

* **client:** app drawer now supports different tags colors ([cbc2baa](https://github.com/hamboomger/poetro/commit/cbc2baae1ef0f9eb06b6f7508f8373d5b62b580a))
* **client:** new color picker view for the tag menu item ([68aec90](https://github.com/hamboomger/poetro/commit/68aec90b4686a16901e977c16e1df07d1885aded))
* **client:** now tag color picker actually changes color of the tag permanently ([2bbd325](https://github.com/hamboomger/poetro/commit/2bbd3252ca57a2aeb6fc0ce2a3516604c439a762))
* **client:** tag entries in the drawer now support context menu, only visually for now ([abbdf11](https://github.com/hamboomger/poetro/commit/abbdf11ec0f31c39aa6ebf75f052e0fcfed28834))
* **server:** initially created tags now have different colors ([89bcaba](https://github.com/hamboomger/poetro/commit/89bcaba0acd66462a3eeedb855995a0193ad8df7))
* **server:** new POST /tags/create route added ([2013935](https://github.com/hamboomger/poetro/commit/2013935d84f30b6a755f312477ff79064ad58fb8))
* **server:** PUT /api/tags/:id/update now works properly, proper mongo doc conversion on repo level ([ce149f1](https://github.com/hamboomger/poetro/commit/ce149f1a45cc16965e2665a1b12c4dcba76c9d2f))

## [1.4.0](https://github.com/hamboomger/poetro/compare/v1.3.0...v1.4.0) (2021-04-11)


### Features

* **client:** google authorization flow implemented ([e3e9559](https://github.com/hamboomger/poetro/commit/e3e95597b56d084f62cecccbbbf324f38ec73886))
* **client:** new Google Sign-In button added to the Login Form ([56605b1](https://github.com/hamboomger/poetro/commit/56605b1abee29ef0bba510b9880dbe3d2d9efd99))
* **server:** google Oauth2 integrated via passport.js strategy ([690c7af](https://github.com/hamboomger/poetro/commit/690c7afcde9d471030b72a382b540989b3b0ce25))


### Bug Fixes

* **mongo:** docker-compose.prod.yml config fixed after the change of production servers ([d209c19](https://github.com/hamboomger/poetro/commit/d209c19dc310b14d9c0a32237b43dbead8153845))

## [1.3.0](https://github.com/hamboomger/poetro/compare/v1.2.0...v1.3.0) (2021-04-09)


### Features

* **server:** gulp integration ([0275f29](https://github.com/hamboomger/poetro/commit/0275f29916d8ca67d8232c6a50fa461a5bdd36c0))

## 1.2.0 (2021-04-07)


### Features

* **auth:** first pass on JWT authentication ([4861642](https://github.com/hamboomger/poetro/commit/48616420600ca1a2dd64d5eeab39198bed89479a))
* **ci:** Circle ci configuration added ([b799b52](https://github.com/hamboomger/poetro/commit/b799b5270e5c9c35022cf5f268a9231cdb861392))
* **client:** Custom implementation of form building created ([e73d785](https://github.com/hamboomger/poetro/commit/e73d785138427c369f0608e2401bde4d3b116136))
* **client:** eslint-staged now checks both client and server files for errors ([e5f2a53](https://github.com/hamboomger/poetro/commit/e5f2a53322487eac0c36d54cfc9199035d70f3aa))
* **client:** home page now shows list of poems ([e9cc9ed](https://github.com/hamboomger/poetro/commit/e9cc9ed350f2c8317a0a865987ab80e3ab7c6f2a))
* **client:** left drawer with all tags added ([55dd012](https://github.com/hamboomger/poetro/commit/55dd012ac8f889efa98d9e3e0340d5383126c660))
* **client:** logout button now works properly, token expiration date added ([28f8ff3](https://github.com/hamboomger/poetro/commit/28f8ff3b51012c2090f5f391b02333e841be1fcf))
* **client:** minor changes to the application look ([4ca2147](https://github.com/hamboomger/poetro/commit/4ca21473c8bed192c676db1d5c3447325d96d8c9))
* **client:** minor visual improvements to a bunch of poem views ([1314d22](https://github.com/hamboomger/poetro/commit/1314d222267adf562853e9b3aacd687c54a80bcf))
* **client:** minor visual improvements to the 'clear selection' button in drawer ([466fd52](https://github.com/hamboomger/poetro/commit/466fd5234703eb9d9f187e517b96e97e5b37c29e))
* **client:** minor visual improvements to the app drawer behaviour ([43098a7](https://github.com/hamboomger/poetro/commit/43098a729f63e393755954cefd48d30442f60c92))
* **client:** minor visual improvements to the poems view ([1ff7137](https://github.com/hamboomger/poetro/commit/1ff713740cf92d9e180e4172b9c926bd6104fd97))
* **client:** minor visual upgrades and code refactor ([8ded668](https://github.com/hamboomger/poetro/commit/8ded668316c5023e87f44e49da3f601549bcf86e))
* **client:** poem creation page created ([7a60a57](https://github.com/hamboomger/poetro/commit/7a60a57a39dedc2f0c66384d08bd66d44d348f64))
* **client:** poem description page created ([a83fa18](https://github.com/hamboomger/poetro/commit/a83fa18c94ee845583a99887f3418c5f2e3df056))
* **client:** poem modification page created ([65658ae](https://github.com/hamboomger/poetro/commit/65658ae487d71773e32c7703f86b61f211431e73))
* **client:** poem preview added in the form of modal window ([8202f92](https://github.com/hamboomger/poetro/commit/8202f92874e5b63c9969a31e54e41845276aa9e6))
* **client:** poems filtering by tag added using left drawer ([bcd1af8](https://github.com/hamboomger/poetro/commit/bcd1af8f5d599dbb945918bc66be4250f40f2288))
* **client:** react app is generated in src/client ([921af05](https://github.com/hamboomger/poetro/commit/921af057fad3bd014a526f353d2407d98c43f86a))
* **client:** react component added - Poem.tsx ([585aa9a](https://github.com/hamboomger/poetro/commit/585aa9a243c98ce4a261a3c5d559e1a898e4ec96))
* **client:** redux state management integration ([1778608](https://github.com/hamboomger/poetro/commit/1778608c367e72ae58079531af57cdd48e039a40))
* **client:** small visual improvements on poem deletion ([7384dbd](https://github.com/hamboomger/poetro/commit/7384dbd5bb0fdc7f02a664218dca9bc6554bf00a))
* **client:** table of all poems implemented as stacked(pinterest-like) grid ([917b066](https://github.com/hamboomger/poetro/commit/917b066a6b9062e9d382b966f7122124b6def0a7))
* **client:** tags and banner added to the poem creation form ([369e628](https://github.com/hamboomger/poetro/commit/369e628be09da5124e6091e2ecb761fd4badb4e7))
* **client:** various visual improvements to the poem view component ([c9a9c38](https://github.com/hamboomger/poetro/commit/c9a9c3830fb41fac3452a0f6eac64f7ec7e69a1f))
* **client-auth:** redux action created for setting the user name to the app state ([a733479](https://github.com/hamboomger/poetro/commit/a7334793328d33a55a60d04a4bc2b5cf71764d4a))
* **client-drawer:** better tag highlightment added ([99741ee](https://github.com/hamboomger/poetro/commit/99741eeafa712a5d0125ea1f66a7ac3f1c1a7dc9))
* **docker:** Docker support added ([d4cdd51](https://github.com/hamboomger/poetro/commit/d4cdd5118d6d69aa8499576cebfa24f48354d0e9))
* **docker:** docker-compose.prod.yml created with persistent data volume for mongodb ([fd7a242](https://github.com/hamboomger/poetro/commit/fd7a242e3a56478f6632f52df2d186ab753600d9))
* **docker:** docker-compose.prod.yml created with persistent data volume for mongodb ([3c5f3d1](https://github.com/hamboomger/poetro/commit/3c5f3d12970684c4998b6df408f229344444bcdb))
* **docker:** port forwarding of a client container from 8080 to 80 for the dev server ([fb29af8](https://github.com/hamboomger/poetro/commit/fb29af8f039842b4bf2e4cd69ea119d837fff649))
* **docker:** removed client ports mapping entry from docker-compose.prod.yml, as it is now controlled by nginx ([3b91170](https://github.com/hamboomger/poetro/commit/3b91170fe7a93231c30319a2fcbedb85373ae99f))
* **docker:** separate Dockerfiles for server and client modules ([39127de](https://github.com/hamboomger/poetro/commit/39127debd72cd8275a3ee1a13d5a734797555230))
* **lerna:** first pass on the project modules management using lerna ([bed8ddc](https://github.com/hamboomger/poetro/commit/bed8ddc5e273cd2b151d4e4b69715fd513fd7c9d))
* **mongodb:** secure database authentication on the production server instead of exposed port =_= ([b380b6f](https://github.com/hamboomger/poetro/commit/b380b6f946cce37388136ab937777ed9565627c6))
* **package.json:** commitizen library integration ([dbc3c8d](https://github.com/hamboomger/poetro/commit/dbc3c8d7473fa45347fb1333271e6b26d4c31493))
* **package.json:** standard-version library integration ([49814d4](https://github.com/hamboomger/poetro/commit/49814d425360ee43456f4144ffa3c25724ea9d68))
* **readme:** link to the live server added to the README.md ([5ba8186](https://github.com/hamboomger/poetro/commit/5ba8186368504f91e958a772ef986810380ef93f))
* **server:** /api/register-local and /api/login-local routes added ([df323c5](https://github.com/hamboomger/poetro/commit/df323c59336f09cd9a3761ffb883529fde60a44a))
* **server:** all requests to /api/poems and /api/tags are now user-specific ([63048c5](https://github.com/hamboomger/poetro/commit/63048c5a498341f79a47cdefe8b91ef165d2112c))
* **server:** DELETE /api/poem/:poemId route added ([0225608](https://github.com/hamboomger/poetro/commit/0225608ff6183b7b4c3ec847e374c7574f2db37d))
* **server:** GET /api/tags route created ([6b9058f](https://github.com/hamboomger/poetro/commit/6b9058fa52aad83aace9354e615e550434b733eb))
* **server:** initial data for new users created ([694fd34](https://github.com/hamboomger/poetro/commit/694fd34222bfb175f89035d97c41f2eedae474b0))
* **server:** jwt authentication middleware added ([d314dfa](https://github.com/hamboomger/poetro/commit/d314dfae4a6273b8187bda0d42047d83ed062b64))
* **server:** logging improvements and minor bugfixes ([50bef87](https://github.com/hamboomger/poetro/commit/50bef879ba8c03fd27e4b3d034514b3226261632))
* **server:** new /api/poem POST route added ([ace88d9](https://github.com/hamboomger/poetro/commit/ace88d9a314fc46e7ae6f372928b7da8cf7ba85c))
* **server:** new /poems GET route added ([33668dc](https://github.com/hamboomger/poetro/commit/33668dc91f0214aa9e29722621ffc1161c18a3f5))
* **server:** PUT /api/poem/:poemId route added ([c62c128](https://github.com/hamboomger/poetro/commit/c62c12807b1fe0f0a774af728e8be8f3800f1a26))
* **server:** tags field added to poem model ([ac55e2f](https://github.com/hamboomger/poetro/commit/ac55e2f1e9a8b75817dfee33db1f177e45d233ce))
* **server-api:** additional /tags routes added ([042e58e](https://github.com/hamboomger/poetro/commit/042e58e776e20c7c3024fa2af6cefec2267d12df))
* **server-api:** authentication logic moved to the new AuthService ([c4c8fd6](https://github.com/hamboomger/poetro/commit/c4c8fd692b5dc3ceb55cb390046649179628f2b4))
* **server-log:** winston logging integration ([f59644d](https://github.com/hamboomger/poetro/commit/f59644d3884d29c222080f6a946db3e21f90b472))
* **server-logs:** better error request handling by the requestsLogger ([a5df694](https://github.com/hamboomger/poetro/commit/a5df6943b11d3250b60643a41bcccb4c09cbfaf9))


### Bug Fixes

* **ciercleci:** wrong path to package-lock.json files fixed ([1c6d1f8](https://github.com/hamboomger/poetro/commit/1c6d1f85536e850c3c8b59a428ee70a3d6621c56))
* **circleci:** circle ci build steps fixed after the lerna integration ([1675e61](https://github.com/hamboomger/poetro/commit/1675e61ffd800d4d66c16baa1f86b359e6da2359))
* **circleci:** deploy job temporarily removed from the circleci config ([ff1669d](https://github.com/hamboomger/poetro/commit/ff1669dff92314f2323b75b266a3719759e2cc64))
* **client:** app drawer now works properly on mobile devices ([3c3d102](https://github.com/hamboomger/poetro/commit/3c3d102757f54796f735cf40b0b3740568ebd12d))
* **client:** drawer is now swipeable on mobile devices ([e29a500](https://github.com/hamboomger/poetro/commit/e29a500ca6b8a69e770d925429d6786f8c146080))
* **client:** fixed bug blocking the deletion of a poem from list ([fc97898](https://github.com/hamboomger/poetro/commit/fc97898f6bae2a9f2a19c5a38de3a03712c75b6b))
* **client:** key added to the tags list on poems grid item ([aeda1a5](https://github.com/hamboomger/poetro/commit/aeda1a5d872a8bb6bb8ffe1666ef0d243ecfc6da))
* **client:** minor bugfixes to tags and poem form ([ed4629c](https://github.com/hamboomger/poetro/commit/ed4629cac081ce90296c13e91a671165b50818c8))
* **client:** poem model window now displays properly on mobile devices ([f59922e](https://github.com/hamboomger/poetro/commit/f59922ec7559ad53bfb5d14a112bfc718845cbaf))
* **client:** poem text should be split in 2 columns on mobile devices anymore ([c910954](https://github.com/hamboomger/poetro/commit/c9109547378b44760547f07b23cf164543afb5d3))
* **client:** react-hooks/exhaustive-deps warning fixed ([0c7611b](https://github.com/hamboomger/poetro/commit/0c7611b8bc3ad62f7726463f3388c3f10a12c0e9))
* **client-auth:** all routes aside from /login and /register now should be accessible only for authorized user ([fa86073](https://github.com/hamboomger/poetro/commit/fa86073b5431805f990c6779c4af3df5c0ea8943))
* **docker:** all the volumes declarations removed from the docker-compose ([41cb826](https://github.com/hamboomger/poetro/commit/41cb826cccda2e4837115a5660df4299a6497227))
* **docker:** minor improvements to the Dockerfile and docker-compose.yml ([a96258f](https://github.com/hamboomger/poetro/commit/a96258f065f7e38af4a82564a5337deeeedf36ac))
* **docker-compose:** app should now listen to port 80 instead of port 8080 in production environment ([dc39d06](https://github.com/hamboomger/poetro/commit/dc39d06c014c2fafa8056b7fd887e205357b162a))
* **docker-compose:** bug with node_modules not having new deps installed inside of container got fixed(probably) ([106d9aa](https://github.com/hamboomger/poetro/commit/106d9aa61498472f7cb3acbf75fc8c3625cf2c5e))
* **integration-tests:** register-local integration test now also checks whether a new user has default poems ([a7f5946](https://github.com/hamboomger/poetro/commit/a7f5946a049f1f7d8716d0984b3092eeb29ee07e))
* **server:** fixed bug in DELETE /api/poem/:poemId route, additional tests created ([9318a2c](https://github.com/hamboomger/poetro/commit/9318a2c9d30fe02d4280b11bf0fb51954eca7905))
* **server:** fixed error when making POST poem request with non-empty tags field ([e447d35](https://github.com/hamboomger/poetro/commit/e447d35ca125a4b03e982dced40458eb7f148f70))
* **server:** imports in the index.ts file got rearranged ([c5b1ce6](https://github.com/hamboomger/poetro/commit/c5b1ce68059e9054af348b476f1e58d308be5dc2))
* **server:** SERVER_PORT typo fixed ([21a7fbb](https://github.com/hamboomger/poetro/commit/21a7fbba02f3fe06d4bba392ff7169c055b0af06))
* **server-auth:** slight rearrangement of auth middlewares ([70fed1d](https://github.com/hamboomger/poetro/commit/70fed1d8ac389f0fd54bcf3b4db19b8f06970fa2))
* **server-auth:** WEB_TOKEN_SECRET is now required to run the application ([cf44db2](https://github.com/hamboomger/poetro/commit/cf44db2750d29c4d8f096fa1488fd2e2ef96ceab))
* **server-deps:** mongoose version downgraded to the 5.7.2 to comply with the @types/mongoose version ([1bfc57e](https://github.com/hamboomger/poetro/commit/1bfc57e9a9698aa0e51767c146c17b67e76dc7dd))
* **test-api:** type guards added for the test suite after moving to the 'strict' typescript compilation mode ([8ed7dd1](https://github.com/hamboomger/poetro/commit/8ed7dd13b2707b9310d1f03e689e0f93b384e9ef))
* **testing:** mocha process is not hanging no more after tests completed ([8e84b64](https://github.com/hamboomger/poetro/commit/8e84b64b8d2b8d8388a06e83f53e953bfd03f838))
