<template>
    <div class="modal fade" id="modal" tabindex="-1" ref="modalElement">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                   <slot name="body"/>
                </div>
                <div class="modal-footer">
                    <slot name="footer"/>
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Modal } from "bootstrap";
import { onMounted, ref } from "vue";

defineProps({
    title: {
        type: String,
        default: "<<Title is goes Here>>"
    }
});

let modalElement = ref(null);

let thisModalObj = null

onMounted(() => thisModalObj = new Modal(modalElement.value));

function _show() {
    thisModalObj.show();
}

function _close(){
    thisModalObj.hide();
}

defineExpose({ show: _show ,close:_close});

</script>