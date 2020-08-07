select creation_id
from tichel 
where id in (
    'eb859da1-f0d1-4522-8b15-201e0fdaa585'
);

CREATE OR REPLACE FUNCTION func_get_creation_id(times_row times)
RETURNS UUID AS $$
   SELECT creation_id 
      FROM tichel
      WHERE tichel.id = times_row.tichel_id;
$$ LANGUAGE sql STABLE;

DROP FUNCTION func_get_creation_id;