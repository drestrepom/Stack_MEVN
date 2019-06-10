<template>
    <div>
        <div class="modal" :class="{ 'is-active': isActive }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    Agregar Nota
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <div class="control">
                            <input v-model="title" class="input" type="text" placeholder="Titulo">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <textarea v-model="body" class="textarea" placeholder="Contenido de la nota"></textarea>
                        </div>
                    </div>
                    <button @click="create" class="button is-primary is-pulled-right">Agregar</button>
                </section>
            </div>
            <button @click="toggle" class="modal-close is-large" aria-label="close"></button>
        </div>
        <button @click="toggle" class="button is-primary is-pulled-right">Crear Nota</button>
        <br>
    </div>
</template>

<script>
    import {createNote} from '../repository'

    export default {
        name: 'CreateNoteModal',
        data() {
            return {
                title: '',
                body: '',
                isActive: false
            }
        },
        methods: {
            create() {
                let data = {title: this.title, body: this.body};
                createNote(data)
                    .then(data => {
                        this.$emit('createNote', data);
                        this.title = this.body = '';
                        this.toggle();
                    })
                    .catch(err => alert(err.message));
            },
            toggle() {
                this.isActive = !this.isActive;
            },
        },
    }
</script>
