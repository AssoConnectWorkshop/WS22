create table if not exists ws22_prenoms (
  id          bigint generated always as identity primary key,
  name        text not null,
  gender      text not null check (gender in ('M', 'F', 'M/F')),
  origin      text not null,
  meaning     text not null,
  likes_count int  not null default 0
);

create or replace function increment_ws22_prenom_likes(row_id bigint)
returns void language sql as $$
  update ws22_prenoms set likes_count = likes_count + 1 where id = row_id;
$$;

insert into ws22_prenoms (name, gender, origin, meaning) values
  ('Emma',      'F',   'Germanique', 'Entière, universelle'),
  ('Léa',       'F',   'Hébreu',     'Fatiguée, délicate'),
  ('Inès',      'F',   'Espagnol',   'Pure, sainte'),
  ('Jade',      'F',   'Espagnol',   'Pierre précieuse verte'),
  ('Chloé',     'F',   'Grec',       'Jeune pousse verdoyante'),
  ('Alice',     'F',   'Germanique', 'De noble nature'),
  ('Lucie',     'F',   'Latin',      'Lumière'),
  ('Zoé',       'F',   'Grec',       'Vie'),
  ('Marie',     'F',   'Hébreu',     'Aimée de Dieu'),
  ('Jeanne',    'F',   'Hébreu',     'Dieu est miséricordieux'),
  ('Manon',     'F',   'Hébreu',     'Grâce divine'),
  ('Lola',      'F',   'Espagnol',   'Douleurs de la Vierge'),
  ('Sofia',     'F',   'Grec',       'Sagesse'),
  ('Léo',       'M',   'Latin',      'Lion'),
  ('Lucas',     'M',   'Grec',       'Lumière'),
  ('Nathan',    'M',   'Hébreu',     'Don de Dieu'),
  ('Arthur',    'M',   'Celtique',   'Ours, roi'),
  ('Louis',     'M',   'Germanique', 'Guerrier glorieux'),
  ('Pierre',    'M',   'Grec',       'Rocher, pierre'),
  ('Hugo',      'M',   'Germanique', 'Intelligence, esprit'),
  ('Tom',       'M',   'Araméen',    'Jumeau'),
  ('Théo',      'M',   'Grec',       'Don de Dieu'),
  ('Raphaël',   'M',   'Hébreu',     'Dieu guérit'),
  ('Gabriel',   'M',   'Hébreu',     'Force de Dieu'),
  ('Ethan',     'M',   'Hébreu',     'Solide, fort'),
  ('Maxime',    'M',   'Latin',      'Le plus grand'),
  ('Jules',     'M',   'Latin',      'Descendant de Jupiter'),
  ('Camille',   'M/F', 'Latin',      'Servant les dieux'),
  ('Alex',      'M/F', 'Grec',       'Défenseur de l''humanité'),
  ('Charlie',   'M/F', 'Germanique', 'Homme libre'),
  ('Lou',       'M/F', 'Germanique', 'Guerrière célèbre'),
  ('Eden',      'M/F', 'Hébreu',     'Délice, paradis')
on conflict do nothing;
