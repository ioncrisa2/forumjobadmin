<script setup>
import { onMounted } from "vue";

onMounted(() => {
  document.title = "Daftar Perusahaan | Admin";
});

</script>

<template>
  <div>
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="card-title">Semua Daftar Perusahaan</div>
              <div class="row">
                <div class="col-8">
                  <div class="btn-group" role="group">
                    <button class="btn btn-primary btn-sm" type="button">
                      <i class="bi bi-plus-square"></i> Tambah
                    </button>

                    <div class="btn-group" role="group">
                      <button
                        type="button"
                        class="btn btn-secondary btn-sm dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i class="bi bi-file-earmark-spreadsheet"></i> Import
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <a href="#" class="dropdown-item">
                            <i class="bi bi-journal-arrow-down"></i>Import
                            Data
                            </a>
                        </li>
                        <li>
                          <a href="#" class="dropdown-item">
                            <i class="bi bi-journal-arrow-up"></i>Export
                            Data
                          </a>
                        </li>
                        <li>
                          <a href="#" class="dropdown-item">
                            <i class="bi bi-file-earmark-excel"></i>Format
                            Input
                          </a>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
                <div class="col-4">
                  <div class="d-flex justify-content-end">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search Here"
                      />
                      <button class="btn btn-outline-secondary" type="button">
                        <i class="bi bi-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-12 mt-2 rounded-md">
                  <table id="table" class="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Body</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>