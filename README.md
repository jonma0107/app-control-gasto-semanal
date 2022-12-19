# app-control-gasto-semanal
El proyecto pretende crear desde el lado del Front-End una interfaz que permita tener una lista de gastos que mediante la validación con estructuras de control se pueda tener una lógica de cuánto se va gastando a medida que se vayan enlistando gastos hasta completar el total del presupuesto.

+ Inicialmente el sistema pide al usuario ```¿Cuál es tu presupuesto?``` lo cual está validado de tal manera que el sistema no pueda seguir hasta que se digite una entrada de datos con una cifra de números reales.

<div align="center">
  
![image](https://user-images.githubusercontent.com/53632260/208369482-68c61cd1-8c9b-47a3-a565-145f9e005819.png)
  
</div>

+ Tan pronto se digita la cifra del presupuesto aparecerá en la sección de ```Listado```, permitiendo así conocer el total del presupuesto y listo para crear algún gasto que haga reducir la cifra.

<div align="center">

![image](https://user-images.githubusercontent.com/53632260/208357271-47794c2d-c9ca-4e81-9e1b-da6064c9523c.png)
  
</div>  

+ En la sección ```Añade tus gastos aqui``` podemos darle nombre a nuestro gasto y digitar el valor o la cifra que represente lo que se quiere gastar, completando de esta manera los campos del formulario para poder darle clic al botón ```Agregar```, la validación no permite que se pueda agregar un gasto si alguno de los campos del formulario está vacío.

<div align="center">

![image](https://user-images.githubusercontent.com/53632260/208369635-3e17cab2-07dc-424f-9989-e911ad1f12af.png)
  
</div>

+ Al darle clic al botón ```Agregar``` se crea un gasto que se puede visualizar en la sección ```Listado``` conociendo el nombre del gasto, la cifra del mismo y adicional hay un botoón que permite borrar el gasto si así se requiere. Dentro de esta parte del proceso hay dos mensajes de alerta, el primero que confirma que el gasto ha sido agregado al listado satisfactoriamente, y el segundo mensaje de alerta, valida según la cantidad del gasto frente al total del presupuesto, por ejemplo si se gasta el 50% del presupuesto total el mensaje lanzará un alerta informando que el valor ```Restante``` contiene la cifra actual según lo que se le haya restado al presupuesto total menos el valor o la cifra del gasto. En la imagen podemos contemplar cómo al gastarse el total del presupuesto se lanza un mensaje de alerta informando que se ha gastado el total de todo el presupuesto y pintando de color rojo tanto el alerta del mensaje como el lugar donde se visualiza la cantidad restante, así mismo se validó el botón de agregar de tal manera que desaparezca hasta que se borre un gasto considerando que ya no hay ninguna cantidad que se pueda gastar.

<div align="center">
  
![image](https://user-images.githubusercontent.com/53632260/208357333-776194d0-e904-4694-a2a1-8aa7115b50c3.png)
  
</div>

+ Al considerar borrar el gasto mediante el botón de ```Borrar``` también observamos que transcurridos 4 segundos los mensajes de alerta desaparecen.

<div align="center">
  
![image](https://user-images.githubusercontent.com/53632260/208357361-a4b5d65b-9712-4bec-b26e-c2f185c581bf.png)
  
</div>

+ Borrado el gasto que consideremos borrar, la cifra que haya en el lugar de ```Restante``` cambiará sumándose a ella la cantidad que se le había restado devolviendole así valores que se le habían quitado por la cantidad del gasto o los gastos que se hubieran enlistado. Así mismo por medio de la validación también se reintegra el botón de ```Agregar``` estando así disponible para crear un nuevo gasto

<div align="center">
  
![image](https://user-images.githubusercontent.com/53632260/208369831-490c3213-d5af-4441-b4e3-6623b77e1e4e.png)
 
</div>    
