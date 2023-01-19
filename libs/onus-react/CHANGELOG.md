@onus-elements/react

# 1.0.0 (2023-01-19)


### Bug Fixes

* change prettier config - need to trigger a publish ([0d33b00](https://github.com/jakerichan/onus-elements/commit/0d33b00cda0f39b47047ff8302e0bef8704e5851))
* fixing release dist folder config ([8851dbe](https://github.com/jakerichan/onus-elements/commit/8851dbea16462d72219e712aaeb47f45f7801e82))
* fixing release package root ([7edec61](https://github.com/jakerichan/onus-elements/commit/7edec61f364b45c7a2dadb35aa9224c74b6120cd))
* folder path fix for releasing onus-react ([779ba18](https://github.com/jakerichan/onus-elements/commit/779ba1820bb020c29ededbbf7dc553df32994096))
* iterate on fixing release configuration ([cdb91ac](https://github.com/jakerichan/onus-elements/commit/cdb91ac64962d632a921862aae923b6e7c5b6cfd))
* move core utils into utils file - triggering release ([762a121](https://github.com/jakerichan/onus-elements/commit/762a12177b5c1d943a5c3dbe52543beb56b2f8e5))
* need to publish only the dist folder ([87b67bc](https://github.com/jakerichan/onus-elements/commit/87b67bc5368d5ce20e87a20967def61ab428f156))
* **onus-core:** implement release target so core can be published ([a5fa81e](https://github.com/jakerichan/onus-elements/commit/a5fa81e1c4f1f8cde5ee0dc19674f8d677139b78))
* **onus-core:** specify public access in the package json for core ([39f2a69](https://github.com/jakerichan/onus-elements/commit/39f2a6979f294319a9db4ac36ad9ea0c0c6069be))
* **onus-react:** add publish config to package.json ([299dac3](https://github.com/jakerichan/onus-elements/commit/299dac3bc5c28083d0edfaab94ab12b845ce9fb9))
* **onus-react:** fixing prettier formatting ([839ff0d](https://github.com/jakerichan/onus-elements/commit/839ff0dbbb1fde3949f5a0fb7b4cd6b54c357440))
* **onus-react:** formatter fixes ([d9fe42f](https://github.com/jakerichan/onus-elements/commit/d9fe42f5072b25a7a9efa5e7071a63ed21fecbd1))
* **onus-react:** quick change to trigger a publish ([e7d067b](https://github.com/jakerichan/onus-elements/commit/e7d067b388999489d0eb3c630361e24b1cd3de58))
* **onus-react:** whitespace change to test the release job ([23b6823](https://github.com/jakerichan/onus-elements/commit/23b6823cbebd26aa26ced2ed453805316df62625))
* release new version that will have files in the artifact ([aea289e](https://github.com/jakerichan/onus-elements/commit/aea289eba3945892a1851405337971e9060572d4))


### Features

* include a key for each child GetElement renders ([695e6fe](https://github.com/jakerichan/onus-elements/commit/695e6fed41bb0b99bc77013a8ace1de3061d6a77))
* **onus-core:** break core functionality into pure js package ([cad6ba9](https://github.com/jakerichan/onus-elements/commit/cad6ba90fe1aa48c8a54f3e3d9581b126be8541c))
* **onus-react:** release new version of onus-react ([526a6ff](https://github.com/jakerichan/onus-elements/commit/526a6ff3db80f1d94ca49e747ecbf2713dce084b))
* release only the esm format ([f1c825d](https://github.com/jakerichan/onus-elements/commit/f1c825d8f0ad76f5869e6b53421a4af897026b02))
* wrote function doc for buildContentStack - triggering release ([04ccec3](https://github.com/jakerichan/onus-elements/commit/04ccec3bf9d8911edf6036346bcff74e1d7ec670))


### BREAKING CHANGES

* **onus-core:** findDeepest no longer returns JSX by default. Instead, the core module will return
an array of items in priority order and its up to the framework to implement how that works
