# pos_backend_magang
aplikasi kasir

buat migrasi table
	npx sequelize migration:create --name "namaTable"

buat struktur table untuk di dalam migrations

melakukan migrasi table
	npx sequelize db:migrate

buat sebuah model yang mempresentasikan table tersebut dalam folder model (untuk menghubungkan program dengan database)

buat module (route, controller)

