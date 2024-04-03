import React from "react";
import { IoClose } from "react-icons/io5";

export default function Modal() {
  return (
    <div className="fixed left-0 top-0 w-full h-full flex justify-center bg-[rgb(0,0,0,0.5)]">
      <form className=" flex flex-col 
      mx-4 mt-32 py-4 px-8 
      w-full h-[40vh]
      bg-white rounded-md">
        <button className="self-end">
          <IoClose />
        </button>
        <fieldset className="flex flex-col items-center">
          <label htmlFor="group-name" className="text-center text-cafe">
            Nuevo Grupo
          </label>
          <input id="group-name" name="name" type="text" className="w-2/3 my-2 border-slate-400 border-2 rounded-md" required />
        </fieldset>
        <fieldset className="grid grid-cols-4 
        justify-items-center content-around 
        border-slate-400 border-2 rounded-md 
        p-2 h-1/2">

          <input
            className="hidden"
            type="radio"
            id="Purple"
            value="Purple"
            name="Color"
            defaultChecked
          />
          <label
            className="bg-morado h-12 w-12 cursor-pointer rounded-md focus:ring-slate-400 focus:ring-2"
            htmlFor="Purple">
          </label>

          <input
            className="hidden"
            type="radio"
            id="Green"
            value="Green"
            name="Color"
            defaultChecked
          />
          <label
            className="bg-verde h-12 w-12 cursor-pointer rounded-md focus:ring-slate-400 focus:ring-2"
            htmlFor="Green">
          </label>

          <input
            className="hidden"
            type="radio"
            id="Brown"
            value="Brown"
            name="Color"
            defaultChecked
          />
          <label
            className="bg-cafe h-12 w-12 cursor-pointer rounded-md"
            htmlFor="Brown">
          </label>

          <input
            className="hidden"
            type="radio"
            id="Blue"
            value="Blue"
            name="Color"
            defaultChecked
          />
          <label
            className="bg-azul h-12 w-12 cursor-pointer rounded-md"
            htmlFor="Blue">
          </label>

          <input
            className="hidden"
            type="radio"
            id="White"
            value="White"
            name="Color"
            defaultChecked
          />
          <label
            className="bg-white h-12 w-12 cursor-pointer rounded-md border-slate-400 border-2"
            htmlFor="White">
          </label>

          <input
            className="hidden"
            type="radio"
            id="Yellow"
            value="Yellow"
            name="Color"
            defaultChecked
          />
          <label
            className="bg-amber-500 h-12 w-12 cursor-pointer rounded-md"
            htmlFor="Yellow">
          </label>

          <input
            className="hidden"
            type="radio"
            id="Pink"
            value="Pink"
            name="Color"
            defaultChecked
          />
          <label
            className=" bg-rose-200 h-12 w-12 cursor-pointer rounded-md"
            htmlFor="Pink">
          </label>

          <input
            className="hidden"
            type="radio"
            id="Red"
            value="Red"
            name="Color"
            defaultChecked
          />
          <label
            className="bg-rojo h-12 w-12 cursor-pointer rounded-md"
            htmlFor="Red">
          </label>

        </fieldset>

        <button type="submit" className="text-white bg-cafe focus:ring-4  focus:ring-cafe-light rounded-md py-1 text-center mt-2">
                    Crear
                </button>
      </form>
    </div>
  );
}

/* 

<!-- Main modal -->
<div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Product
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Select category</option>
                            <option value="TV">TV/Monitors</option>
                            <option value="PC">PC</option>
                            <option value="GA">Gaming/Console</option>
                            <option value="PH">Phones</option>
                        </select>
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                        <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                    </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add new product
                </button>
            </form>
        </div>
    </div>
</div> 

/// FORM
<div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-full">
      <form className="bg-white">
        <IoClose />
        <label htmlFor="group-name">
          Nuevo Grupo
          <input id="group-name" name="first-name" type="text" required />
        </label>

        <fieldset className="p-4">
          <div className="inline-flex">
            <input
              className="hidden"
              type="radio"
              id="Purple"
              value="Purple"
              name="gender"
              defaultChecked
            />
            <label
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer rounded-l"
              htmlFor="Purple"
            >
              Male
            </label>
            <input
              className="hidden"
              type="radio"
              id="female"
              value="female"
              name="gender"
            />
            <label
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer rounded-r"
              htmlFor="female"
            >
              Female
            </label>
          </div>
        </fieldset>
      </form>
    </div>

 */
