CREATE TABLE sys_keyval (key TEXT, val TEXT);
CREATE TABLE telldus_sensor_history (id NUMERIC, message TEXT, protocol , value NUMERIC, type NUMERIC, ts NUMERIC);
CREATE TABLE telldus_device_history (id NUMERIC, status NUMERIC, ts NUMERIC);
CREATE INDEX index_history on telldus_sensor_history (id,type,ts);
