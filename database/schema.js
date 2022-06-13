// -----Table: public.all_products

// -----DROP TABLE IF EXISTS public.all_products;

CREATE TABLE IF NOT EXISTS public.all_products
  (
    id integer NOT NULL,
    name text COLLATE pg_catalog."default",
    slogan text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    category text COLLATE pg_catalog."default",
    default_price integer,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT all_products_pkey PRIMARY KEY(id)
  )

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.all_products
    OWNER to postgres;
// -----Index: products_index

// -----DROP INDEX IF EXISTS public.products_index;

CREATE INDEX IF NOT EXISTS products_index
    ON public.all_products USING btree
  (id ASC NULLS LAST)
    TABLESPACE pg_default;

// -----Table: public.features

// -----DROP TABLE IF EXISTS public.features;

CREATE TABLE IF NOT EXISTS public.features
  (
    id integer NOT NULL,
    product_id integer,
    feature text COLLATE pg_catalog."default",
    value text COLLATE pg_catalog."default",
    CONSTRAINT features_pkey PRIMARY KEY(id),
    CONSTRAINT features_product_id_fkey FOREIGN KEY(product_id)
        REFERENCES public.all_products(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
  )

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.features
    OWNER to postgres;
// -----Index: features_index

// -----DROP INDEX IF EXISTS public.features_index;

CREATE INDEX IF NOT EXISTS features_index
    ON public.features USING btree
  (product_id ASC NULLS LAST)
    TABLESPACE pg_default;

// -----Table: public.styles

// -----DROP TABLE IF EXISTS public.styles;

    CREATE TABLE IF NOT EXISTS public.styles
  (
    id integer NOT NULL,
    productid integer,
    name text COLLATE pg_catalog."default",
    original_price integer,
    default_style boolean,
    sale_price integer,
    CONSTRAINT styles_pkey PRIMARY KEY(id),
    CONSTRAINT styles_product_id_fkey FOREIGN KEY(productid)
            REFERENCES public.all_products(id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
  )

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS public.styles
        OWNER to postgres;
// -----Index: styles_index

// -----DROP INDEX IF EXISTS public.styles_index;

    CREATE INDEX IF NOT EXISTS styles_index
        ON public.styles USING btree
  (productid ASC NULLS LAST)
        TABLESPACE pg_default;


// -----Table: public.photos

// -----DROP TABLE IF EXISTS public.photos;

CREATE TABLE IF NOT EXISTS public.photos
  (
    id integer NOT NULL,
    styleid integer,
    url text COLLATE pg_catalog."default",
    thumbnail_url text COLLATE pg_catalog."default",
    CONSTRAINT photos_pkey PRIMARY KEY(id),
    CONSTRAINT photos_styleid_fkey FOREIGN KEY(styleid)
        REFERENCES public.styles(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
  )

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.photos
    OWNER to postgres;
// -----Index: photos_index

// -----DROP INDEX IF EXISTS public.photos_index;

CREATE INDEX IF NOT EXISTS photos_index
    ON public.photos USING btree
  (styleid ASC NULLS LAST)
INCLUDE(id, styleid)
    TABLESPACE pg_default;

// -----Table: public.photos

// -----DROP TABLE IF EXISTS public.photos;

    CREATE TABLE IF NOT EXISTS public.photos
  (
    id integer NOT NULL,
    styleid integer,
    url text COLLATE pg_catalog."default",
    thumbnail_url text COLLATE pg_catalog."default",
    CONSTRAINT photos_pkey PRIMARY KEY(id),
    CONSTRAINT photos_styleid_fkey FOREIGN KEY(styleid)
            REFERENCES public.styles(id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
  )

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS public.photos
        OWNER to postgres;
// -----Index: photos_index

// -----DROP INDEX IF EXISTS public.photos_index;

    CREATE INDEX IF NOT EXISTS photos_index
        ON public.photos USING btree
  (styleid ASC NULLS LAST)
INCLUDE(id, styleid)
        TABLESPACE pg_default;

// -----Table: public.skus

// -----DROP TABLE IF EXISTS public.skus;

        CREATE TABLE IF NOT EXISTS public.skus
  (
    id integer NOT NULL,
    styleid integer,
    size text COLLATE pg_catalog."default",
    quantity integer,
    CONSTRAINT skus_pkey PRIMARY KEY(id),
    CONSTRAINT skus_styleid_fkey FOREIGN KEY(styleid)
                REFERENCES public.styles(id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
  )

        TABLESPACE pg_default;

        ALTER TABLE IF EXISTS public.skus
            OWNER to postgres;
// -----Index: skus_index

// -----DROP INDEX IF EXISTS public.skus_index;

        CREATE INDEX IF NOT EXISTS skus_index
            ON public.skus USING btree
  (styleid ASC NULLS LAST)
            TABLESPACE pg_default;

// -----Table: public.related

// -----DROP TABLE IF EXISTS public.related;

            CREATE TABLE IF NOT EXISTS public.related
  (
    id integer NOT NULL,
    current_product_id integer,
    related_product_id integer,
    CONSTRAINT related_pkey PRIMARY KEY(id),
    CONSTRAINT related_current_product_id_fkey FOREIGN KEY(current_product_id)
                    REFERENCES public.all_products(id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
    CONSTRAINT related_related_product_id_fkey FOREIGN KEY(related_product_id)
                    REFERENCES public.all_products(id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
  )

            TABLESPACE pg_default;

            ALTER TABLE IF EXISTS public.related
                OWNER to postgres;
// -----Index: related_index

// -----DROP INDEX IF EXISTS public.related_index;

            CREATE INDEX IF NOT EXISTS related_index
                ON public.related USING btree
  (current_product_id ASC NULLS LAST)
                TABLESPACE pg_default;