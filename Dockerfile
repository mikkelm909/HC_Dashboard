FROM mhart/alpine-node:12

# install dependencies
WORKDIR /HC_dashboard
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm run build

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM mhart/alpine-node:slim-12

WORKDIR /HC_dashboard
COPY --from=0 /HC_dashboard .
COPY . .

EXPOSE 3000
CMD ["node", "./build"]